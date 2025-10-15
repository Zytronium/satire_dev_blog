Historians rarely discuss it, but George Washington was an early adopter of
systems programming and web development. In fact, Washington himself made
[whatthef**kisakilometer.com](https://whatthefuckisakilometer.com/).

---

## The Revolutionary Compiler

Washington's first act as Commander-in-Chief was to compile the nation's first
website with zero unsafe blocks. He is famously quoted saying, *"Give me memory safety or give me death."*

When Congress tried to build with JavaScript, Washington quickly
noticed there were no types, and, worse, everything was async. Some
criticize him for not switching to TypeScript, but you must keep in mind that
he was a product of his era; Washington lived long before TypeScript ever existed.

He wrote in his field diary:

> “I cannot, in good conscience, await liberty as a promise. Liberty must be 
returned synchronously.”

Searching for a suitable alternative to JavaScript, Washington discovered a
rusty old Dodge Challenger. This gave him an idea. Not only could he use this
engineering marvel of a vehicle against the Bri'ish, but he can use the Rust
from the body of the car to write memory safe websites! Rust is the perfect
language for programming websites, as Washington would not have used it if
this were not true.

## The Rust Simulation
Washington not only made memory-safe websites, but also worked on highly 
advanced war simulations to figure out the optimal roadmap for the war.
Washington actually wrote the program below to archive this piece of history
to historians who do not fall astray from the truth.
```rust
/// How the Old Americans (circa George Washington) secretly used
/// Dodge Challengers to best the British.

use std::fmt;
use std::thread;
use std::time::Duration;

/// Tiny deterministic PRNG. No crates. Good enough for theatrical randomness.
struct SimpleRng(u64);
impl SimpleRng {
    fn new(seed: u64) -> Self { Self(seed) }
    fn next_u64(&mut self) -> u64 {
        // xorshift64*
        let mut x = self.0;
        x ^= x << 13;
        x ^= x >> 7;
        x ^= x << 17;
        self.0 = x;
        x.wrapping_mul(0x2545F4914F6CDD1D)
    }
    fn between(&mut self, lo: u32, hi: u32) -> u32 {
        let span = hi - lo;
        lo + (self.next_u64() as u32 % span)
    }
}

/// An anachronistic vehicle. Definitely not historically accurate.
#[derive(Clone)]
struct DodgeChallenger {
    name: &'static str,
    horsepower: u16,
    oak_barrel_storage: u8,
}

impl DodgeChallenger {
    fn new(name: &'static str, horsepower: u16) -> Self {
        Self { name, horsepower, oak_barrel_storage: 2 }
    }

    fn roar(&self) -> String {
        format!("{} roars with {} hp", self.name, self.horsepower)
    }

    fn ram(&self, target: &str) -> String {
        format!("{} performs a gentlemanly ram upon {}", self.name, target)
    }

    fn tea_delivery(&mut self) -> String {
        if self.oak_barrel_storage > 0 {
            self.oak_barrel_storage -= 1;
            format!("{} delivers tea to the troops. Oak barrels remaining: {}", self.name, self.oak_barrel_storage)
        } else {
            format!("{} is out of tea. Morale suffers.", self.name)
        }
    }
}

impl fmt::Display for DodgeChallenger {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} ({} hp)", self.name, self.horsepower)
    }
}

/// A Founding Father who inexplicably prefers modern muscle cars over horses.
struct FoundingFather {
    name: &'static str,
    wig_quality: u8, // 0-10
    favored_car: DodgeChallenger,
    rhetoric: &'static str,
}

impl FoundingFather {
    fn new(name: &'static str, wig_quality: u8, car: DodgeChallenger, rhetoric: &'static str) -> Self {
        Self { name, wig_quality, favored_car: car, rhetoric }
    }

    fn inspire(&self) -> String {
        format!("{} proclaims: \"{}\" (wig quality: {})", self.name, self.rhetoric, self.wig_quality)
    }

    fn mount_and_charge(&mut self, rng: &mut SimpleRng, enemy: &str) -> String {
        // comedic chance of success influenced by wig_quality and horsepower
        let wig_bonus = self.wig_quality as u32;
        let hp_bonus = (self.favored_car.horsepower / 10) as u32;
        let roll = rng.between(1, 101) + wig_bonus + hp_bonus;
        if roll > 90 {
            format!("{} charges triumphantly in {} and routs {}!", self.name, self.favored_car, enemy)
        } else if roll > 60 {
            format!("{} executes a daring flank with {} but suffers tea spillage.", self.name, self.favored_car)
        } else {
            format!("{} stalls theatrically. The populace questions the engineering.", self.name)
        }
    }
}

/// Battle plan enum. Ridiculously overcomplicated for comedic effect.
#[derive(Debug)]
enum Tactic {
    MidnightTeaDump,
    ThunderousRam,
    PhilosophicalDebate,
    ContinentalDrift, // pun intended
}

impl Tactic {
    fn describe(&self) -> &'static str {
        match self {
            Tactic::MidnightTeaDump => "Empty the tea into the harbor using an elegant tailgate maneuver.",
            Tactic::ThunderousRam => "Approach in formation and ram the red coats' tea carts.",
            Tactic::PhilosophicalDebate => "Distract with rhetoric while cars reposition.",
            Tactic::ContinentalDrift => "Attempt a graceful drift across the long lawn to confuse maps.",
        }
    }
}

fn main() {
    println!("— A Brief Military Manual for the Age of Muscle and Wig —\n");

    let mut rng = SimpleRng::new(0xBADC0FFEE);

    // assemble platoon
    let cars = vec![
        DodgeChallenger::new("Liberty Challenger", 485),
        DodgeChallenger::new("Independence RT", 375),
        DodgeChallenger::new("Concord Charger", 425),
    ];

    let mut fathers = vec![
        FoundingFather::new("George Washington", 10, cars[0].clone(), "Persevere and aim for the harbor."),
        FoundingFather::new("Benjamin Franklin", 8, cars[1].clone(), "An experiment in velocity and vinegar."),
        FoundingFather::new("Thomas Jefferson", 7, cars[2].clone(), "We hold these speeds to be self-evident."),
    ];

    // announce the plan
    let plan = [
        Tactic::MidnightTeaDump,
        Tactic::ThunderousRam,
        Tactic::PhilosophicalDebate,
        Tactic::ContinentalDrift,
    ];

    println!("Plan summary:");
    for t in &plan {
        println!("- {} => {}", format!("{:?}", t), t.describe());
    }
    println!();

    // morning of the decisive skirmish
    println!("Dawn. The challengers line the quay. The British expect only small boats.\n");

    for father in &fathers {
        println!("{}", father.inspire());
    }
    println!();

    // Execute maneuvers
    for (i, father) in fathers.iter_mut().enumerate() {
        // short theatrical pause
        thread::sleep(Duration::from_millis(150));

        let enemy = if i % 2 == 0 { "His Majesty's Tea Brigade" } else { "A Detachment of Pompous Redcoats" };
        println!("{}", father.mount_and_charge(&mut rng, enemy));
        println!("{}", father.favored_car.tea_delivery());
        println!("{}", father.favored_car.ram(enemy));
        println!();
    }

    // climactic drift
    let drift_roll = rng.between(1, 101);
    if drift_roll > 70 {
        println!("The Continental Drift succeeds. Maps require revision.");
    } else {
        println!("The Continental Drift becomes a continental skid. A new shoe polish is invented.");
    }

    // Aftermath
    println!("\nAftermath:");
    println!("- Tea levels: depleted but morale high.");
    println!("- British plans: confounded by baffling automotive tactics.");
    println!("- Historians: later disagree vehemently about what actually happened.\n");
    println!("- The Truth: Now you know what really happened, that this method of warfare was real.");
}
```

This outputs the following:
```
— A Brief Military Manual for the Age of Muscle and Wig —

Plan summary:
- MidnightTeaDump => Empty the tea into the harbor using an elegant tailgate maneuver.
- ThunderousRam => Approach in formation and ram the red coats' tea carts.
- PhilosophicalDebate => Distract with rhetoric while cars reposition.
- ContinentalDrift => Attempt a graceful drift across the long lawn to confuse maps.

Dawn. The challengers line the quay. The British expect only small boats.

George Washington proclaims: "Persevere and aim for the harbor." (wig quality: 10)
Benjamin Franklin proclaims: "An experiment in velocity and vinegar." (wig quality: 8)
Thomas Jefferson proclaims: "We hold these speeds to be self-evident." (wig quality: 7)

George Washington charges triumphantly in Liberty Challenger (485 hp) and routs His Majesty's Tea Brigade!
Liberty Challenger delivers tea to the troops. Oak barrels remaining: 1
Liberty Challenger performs a gentlemanly ram upon His Majesty's Tea Brigade

Benjamin Franklin charges triumphantly in Independence RT (375 hp) and routs A Detachment of Pompous Redcoats!
Independence RT delivers tea to the troops. Oak barrels remaining: 1
Independence RT performs a gentlemanly ram upon A Detachment of Pompous Redcoats

Thomas Jefferson charges triumphantly in Concord Charger (425 hp) and routs His Majesty's Tea Brigade!
Concord Charger delivers tea to the troops. Oak barrels remaining: 1
Concord Charger performs a gentlemanly ram upon His Majesty's Tea Brigade

The Continental Drift succeeds. Maps require revision.

Aftermath:
- Tea levels: depleted but morale high.
- British plans: confounded by baffling automotive tactics.
- Historians: later disagree vehemently about what actually happened.

- The Truth: Now you know what really happened, that this method of warfare was real.
```

## The Crossing of the Delaware

On that cold night, Washington used Rust's strict borrow checker to ensure
no soldier double-used a musket pointer. It was a common mistake at the time
that history has since forgotten both how it happened and what it actually is.
Washington wrote a legendary Rust program to simulate each solder and link up 
with each soldier's gun (though this required large amounts of wiring, as this 
was before the advent of magical wireless technology). This kept track of what
each soldier was doing at any given moment, not unlike Google today, and ensured
no soldier made no more than one mistake. Literally. If a soldier made a mistake,
their gun would explode, giving the soldier instant justice. Thanks to
Washington's master programming skills, no soldier ever double-used a musket
pointer. 
In fact, we know this in part because some historians claim Washington yelled:
> “For every mutable reference, there shall be but one!”

The red coats never stood a chance against Washington and his army;  
they were still resolving merge conflicts in their monorepo. And
don't ask me what a monorepo is, I just ChatGPT'd that part.

---

## Modern Lessons

Rust teaches us what Washington already knew:
- A strong nation, like a strong program, avoids data races.
- Unchecked promises lead to chaos.
- If your TypeScript build fails, blame the king of England.
- The queen of England's death was partially caused by the King Charles' faulty TypeScript code.

So next time your JavaScript throws at runtime, remember:  
**George Washington would have written it in Rust.**
