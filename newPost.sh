#!/usr/bin/env bash
set -euo pipefail

POSTS_DIR="src/data/posts"

usage() {
  echo "Usage: $0 \"Post Title\""
  exit 1
}

if [ "${#}" -lt 1 ]; then
  usage
fi

TITLE="$*"

# slugify title (lowercase, ascii translit if available, replace non-alnum with -, trim -)
if command -v iconv >/dev/null 2>&1; then
  SLUG=$(printf '%s' "$TITLE" | iconv -t ascii//TRANSLIT 2>/dev/null || true)
else
  SLUG="$TITLE"
fi

SLUG=$(printf '%s' "$SLUG" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g' \
  | sed -E 's/^-+|-+$//g')

# fallback if slug becomes empty
if [ -z "$SLUG" ]; then
  SLUG="post-$(date +%s)"
fi

# ensure posts dir exists
mkdir -p "$POSTS_DIR"

# compute next numeric id by scanning existing meta.json files
max=0
for f in "$POSTS_DIR"/*/meta.json; do
  [ -f "$f" ] || continue
  # extract the first integer after "id"
  id=$(awk -F: '/"id"[[:space:]]*:/ { match($0, /[0-9]+/); if (RSTART) print substr($0,RSTART,RLENGTH) ; exit }' "$f" || true)
  if [ -n "$id" ]; then
    if [ "$id" -gt "$max" ] 2>/dev/null; then
      max=$id
    fi
  fi
done
newid=$((max + 1))

# ensure unique slug (append suffix if needed)
final_slug="$SLUG"
suffix=1
while [ -d "$POSTS_DIR/$final_slug" ]; do
  final_slug="${SLUG}-${suffix}"
  suffix=$((suffix + 1))
done

post_dir="$POSTS_DIR/$final_slug"
mkdir -p "$post_dir"

# escape double quotes in title for JSON
esc_title=$(printf '%s' "$TITLE" | sed 's/"/\\"/g')

today=$(date '+%Y-%m-%d')

cat > "$post_dir/meta.json" <<EOF
{
  "id": $newid,
  "title": "$esc_title",
  "excerpt": "",
  "tags": [],
  "date": "$today"
}
EOF

# create empty content.md
: > "$post_dir/content.md"

# done
echo "Created new post:"
echo "  slug: $final_slug"
echo "  id:   $newid"
echo "  dir:  $post_dir"
