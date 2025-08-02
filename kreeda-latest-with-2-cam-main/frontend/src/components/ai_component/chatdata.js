// src/components/ai_component/chatdata.js
const chatData = [
  // — Gym Exercises —
  {
    keywords: ["plankups", "plank ups"],
    response:
      "**Plank Ups** (also called Up-Down Planks) target your core, shoulders & triceps:\n" +
      "1. Start in forearm plank. 2. Press up to high plank, one arm at a time. 3. Lower back down. 4. Alternate lead arm.\n" +
      "Tip: Keep hips level & core tight to avoid sagging."
  },
  {
    keywords: ["punching stretch", "punching stretch"],
    response:
      "**Punching Stretch** is a dynamic warm-up for shoulders & chest:\n" +
      "1. Stand feet hip-width. 2. Punch forward rapidly, alternating arms. 3. Keep core braced.\n" +
      "Do 30–60 sec before upper-body workouts."
  },
  {
    keywords: ["pushups", "push ups"],
    response:
      "**Push-ups** build chest, shoulders & triceps:\n" +
      "1. Hands under shoulders. 2. Lower until elbows ~90°. 3. Press up. 4. Keep body straight.\n" +
      "Variations: knee push-up (easier), decline (harder)."
  },
  {
    keywords: ["side lunges", "side lunge"],
    response:
      "**Side Lunges** work quads, glutes & inner thighs:\n" +
      "1. Step out to side, bend front knee. 2. Keep opposite leg straight. 3. Push back to center.\n" +
      "Do 10–12 reps each side."
  },
  {
    keywords: ["side squat", "side squats"],
    response:
      "**Side Squats** (Cossack Squat) stretch & strengthen legs:\n" +
      "1. Legs wide. 2. Shift weight into one leg & squat. 3. Keep other leg straight.\n" +
      "Great for hip mobility & adductor strength."
  },
  {
    keywords: ["sit up", "sit-up"],
    response:
      "**Sit-Ups** target the rectus abdominis:\n" +
      "1. Lie back, knees bent. 2. Hands by ears or crossed. 3. Curl torso up. 4. Lower slowly.\n" +
      "Keep chin tucked to avoid neck strain."
  },
  {
    keywords: ["switching lunges", "switch lunges"],
    response:
      "**Switching Lunges** (Alternating Reverse Lunge):\n" +
      "1. Lunge back with right leg, then switch legs in one fluid motion.\n" +
      "Keep torso upright and core engaged."
  },
  {
    keywords: ["triceps kickbacks", "triceps kickback"],
    response:
      "**Triceps Kickbacks** isolate the triceps:\n" +
      "1. Hinge at hips, dumbbell in hand. 2. Upper arm parallel to floor. 3. Extend elbow back. 4. Lower under control."
  },
  {
    keywords: ["vups", "v-ups"],
    response:
      "**V-Ups** are an advanced core move:\n" +
      "1. Lie flat, arms overhead. 2. Lift torso & legs to meet at “V”. 3. Lower slowly.\n" +
      "Keep lower back pressed to the floor on the descent."
  },
  {
    keywords: ["z press", "z-press"],
    response:
      "**Z-Press** (seated overhead press):\n" +
      "1. Sit legs straight on floor. 2. Press barbell or dumbbells overhead. 3. Keep core tight.\n" +
      "Challenges shoulder stability & core strength."
  },
  {
    keywords: ["bench dips", "bench dip"],
    response:
      "**Bench Dips** work triceps & chest:\n" +
      "1. Hands on bench behind you, legs extended. 2. Lower hips, bending elbows to 90°. 3. Press up.\n" +
      "For more challenge, elevate feet."
  },
  {
    keywords: ["bent over row", "bent-over row"],
    response:
      "**Bent-Over Rows** target upper back & lats:\n" +
      "1. Hinge at hips, dumbbells/barbell in hand. 2. Pull weight to lower ribs. 3. Lower under control.\n" +
      "Keep spine neutral & core braced."
  },
  {
    keywords: ["bicep curls", "bicep curl"],
    response:
      "**Bicep Curls** isolate the biceps:\n" +
      "1. Stand tall, dumbbells in hands. 2. Curl weights up, squeezing biceps. 3. Lower slowly.\n" +
      "Don’t swing—keep elbows locked at sides."
  },
  {
    keywords: ["bicyclecrunch", "bicycle crunch"],
    response:
      "**Bicycle Crunches** hit the entire core:\n" +
      "1. Lie back, hands behind head. 2. Alternate bringing opposite elbow to knee. 3. Extend other leg.\n" +
      "Move slowly to really feel the obliques."
  },
  {
    keywords: ["chair squat", "chair squats"],
    response:
      "**Chair Squats** are perfect for beginners:\n" +
      "1. Stand in front of chair. 2. Sit back lightly until glutes touch. 3. Stand up.\n" +
      "Learn proper squat depth & form safely."
  },
  {
    keywords: ["cobrapushups", "cobra push-ups"],
    response:
      "**Cobra Push-Ups** (Arch-Back Push-Ups):\n" +
      "1. Lower your torso while arching spine. 2. Press up keeping chest & hips lifted. 3. Great for thoracic mobility."
  },
  {
    keywords: ["dumbbell front raise", "front raise"],
    response:
      "**Dumbbell Front Raises** for anterior deltoid:\n" +
      "1. Raise dumbbells to shoulder height, palms down. 2. Lower under control.\n" +
      "Keep a slight bend in elbows."
  },
  {
    keywords: ["dumbbell lunge", "dumbbell lunges"],
    response:
      "**Dumbbell Lunges** build leg strength:\n" +
      "1. Hold dumbbells by sides. 2. Step forward, bend both knees to 90°. 3. Push back.\n" +
      "Keep torso upright."
  },
  {
    keywords: ["dumbbell one-arm shoulder press", "one arm shoulder press"],
    response:
      "**One-Arm Dumbbell Shoulder Press**:\n" +
      "1. Press weight overhead while standing. 2. Keep core tight to resist rotation.\n" +
      "Great for unilateral shoulder stability."
  },
  {
    keywords: ["dumbbell romanian deadlift", "romanian deadlift"],
    response:
      "**Romanian Deadlifts** for hamstrings & glutes:\n" +
      "1. Hinge at hips with slight knee bend. 2. Lower dumbbells along legs. 3. Squeeze glutes to stand.\n" +
      "Maintain a flat back."
  },
  {
    keywords: ["dumbbell shoulder press", "shoulder press"],
    response:
      "**Dumbbell Shoulder Press**:\n" +
      "1. Press both dumbbells overhead simultaneously. 2. Lower slowly.\n" +
      "Avoid arching your lower back—brace your core."
  },
  {
    keywords: ["hand and leg stretch", "hand and leg stretch"],
    response:
      "**Bird-Dog / Hand & Leg Stretch** for core & low-back:\n" +
      "1. On all fours, extend opposite arm & leg. 2. Hold, then switch.\n" +
      "Keeps spine neutral and builds stability."
  },
  {
    keywords: ["handplanks", "hand planks"],
    response:
      "**High Plank** (on hands):\n" +
      "1. Hands under shoulders, body in a straight line. 2. Hold core tight.\n" +
      "Add shoulder taps for a challenge."
  },
  {
    keywords: ["hip raise", "hip raises"],
    response:
      "**Hip Raises** (Glute Bridge):\n" +
      "1. Lie back, feet flat. 2. Drive hips upward squeezing glutes. 3. Lower gently.\n" +
      "Keeps hamstrings & glutes engaged."
  },
  {
    keywords: ["jumping jack", "jumping jacks"],
    response:
      "**Jumping Jacks** for cardio & warm-up:\n" +
      "1. Jump feet out & raise arms overhead. 2. Return to start.\n" +
      "Do 30–60 sec to get heart rate up."
  },
  {
    keywords: ["jumping lunges", "jump lunges"],
    response:
      "**Jumping Lunges** for power & cardio:\n" +
      "1. Lunge down, jump and switch legs mid-air. 2. Land softly.\n" +
      "Explosive move—keep core braced."
  },
  {
    keywords: ["lateral raises", "lateral raise"],
    response:
      "**Lateral Raises** for side delts:\n" +
      "1. Lift dumbbells out to sides to shoulder height. 2. Lower slowly.\n" +
      "Keep a slight bend in elbows."
  },
  {
    keywords: ["leg lowers", "leg lowers"],
    response:
      "**Leg Lowers** for lower abs:\n" +
      "1. Lie back, lift legs to 90°. 2. Lower slowly without touching floor. 3. Raise back up.\n" +
      "Stop if low back arches."
  },
  {
    keywords: ["lieups", "leg raises", "lie ups"],
    response:
      "**Leg Raises** (Lie-Ups):\n" +
      "1. Lie flat, lift legs together to 90°. 2. Lower under control.\n" +
      "Great for lower-ab strength."
  },
  {
    keywords: ["lying leg raise"],
    response:
      "**Lying Leg Raises** (same as above) for lower abs:\n" +
      "Maintain core tightness to protect your back."
  },
  {
    keywords: ["mountainclimbers", "mountain climbers"],
    response:
      "**Mountain Climbers** for core & cardio:\n" +
      "1. High plank. 2. Drive knees toward chest one at a time. 3. Keep pace up.\n" +
      "Burns fat & works the entire core."
  },
  {
    keywords: ["pikepushups", "pike push-ups"],
    response:
      "**Pike Push-Ups** for shoulders:\n" +
      "1. Start in pike (hips high). 2. Bend elbows to lower head. 3. Press up.\n" +
      "Progression toward handstand push-ups."
  },

  // — Diet Plans & Nutrition —
  {
    keywords: ["diet plan", "meal plan"],
    response:
      "**7-Day Balanced Meal Plan (≈2,000 kcal/day)**:\n" +
      "- **Breakfast**: Oats + berries + Greek yogurt\n" +
      "- **Snack**: Apple + handful of almonds\n" +
      "- **Lunch**: Grilled chicken salad with quinoa\n" +
      "- **Pre-Workout**: Banana + scoop of whey\n" +
      "- **Post-Workout**: Protein shake + rice cakes\n" +
      "- **Dinner**: Salmon + sweet potato + steamed veggies\n" +
      "- **Before Bed**: Cottage cheese or casein shake\n" +
      "\nStay hydrated (2–3 L water/day) and adjust portions for weight goals."
  },
  {
    keywords: ["weight gain diet", "bulk diet"],
    response:
      "**Mass-Gainer Meal Plan**:\n" +
      "- **Breakfast**: 4 eggs + whole-grain toast + avocado\n" +
      "- **Snack**: Peanut butter sandwich\n" +
      "- **Lunch**: Beef chili with rice\n" +
      "- **Pre-Workout**: Oat smoothie (milk + banana + oats)\n" +
      "- **Post-Workout**: Whey + banana\n" +
      "- **Dinner**: Pasta with chicken & veggies\n" +
      "- **Evening Snack**: Greek yogurt + granola\n" +
      "Aim for +500 kcal above maintenance; 1.2–1.5 g protein/kg bodyweight."
  },
  {
    keywords: ["calorie deficit", "lose weight", "cutting diet"],
    response:
      "**Cutting (Fat-Loss) Nutrition**:\n" +
      "- Eat ~500 kcal below maintenance\n" +
      "- High protein (2 g/kg BW), moderate carbs, low–moderate fat\n" +
      "- Veggies + lean proteins at each meal\n" +
      "- Cardio 2–3×/week, strength 3–4×/week\n" +
      "Track macros & progress weekly. Adjust calories as you lose weight."
  },
  {
    keywords: ["pre workout", "pre-workout meal"],
    response:
      "**Pre-Workout Nutrition** (30–60 min before):\n" +
      "- 20–30 g carbs + 5–10 g protein\n" +
      "- Examples: Banana + Greek yogurt, toast + peanut butter\n" +
      "Helps fuel your session and preserve muscle."
  },
  {
    keywords: ["post workout", "post-workout meal"],
    response:
      "**Post-Workout Recovery** (within 30 min):\n" +
      "- 20–30 g fast protein (whey) + 30–50 g carbs\n" +
      "- Examples: Protein shake + fruit, chocolate milk + granola\n" +
      "Replenishes glycogen and kickstarts muscle repair."
  },
  {
    keywords: ["diet", "diet plan"],
    dynamic: true, // Flag to trigger dynamic response
    response: (bmi) => {
      if (bmi < 18.5) {
        return "**🍽 Underweight Diet Plan**\n" +
          "- **Breakfast**: 3 boiled eggs, whole wheat toast with peanut butter, banana, and whole milk\n" +
          "- **Snack**: Trail mix or handful of nuts + a smoothie\n" +
          "- **Lunch**: Grilled chicken, rice, dal, and mixed veggies with ghee\n" +
          "- **Snack**: Cheese sandwich or boiled sweet potato + protein shake\n" +
          "- **Dinner**: Paneer or tofu curry, roti, salad, curd\n" +
          "- **Before Bed**: Warm milk with almonds or a protein shake";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "**🍽 Healthy Weight Maintenance Plan**\n" +
          "- **Breakfast**: Oatmeal with fruit and a boiled egg or Greek yogurt\n" +
          "- **Snack**: Handful of almonds or fruit\n" +
          "- **Lunch**: Grilled fish or paneer, brown rice, mixed vegetables, salad\n" +
          "- **Snack**: Buttermilk or sprouts chaat\n" +
          "- **Dinner**: Whole wheat roti, dal, sautéed veggies, salad\n" +
          "- **Before Bed**: Herbal tea or a few soaked almonds";
      } else if (bmi >= 25 && bmi <= 29.9) {
        return "**🍽 Overweight Diet Plan** (Mild Calorie Deficit)\n" +
          "- **Breakfast**: Poha or upma with veggies + green tea\n" +
          "- **Snack**: Cucumber or carrot sticks + hummus\n" +
          "- **Lunch**: Grilled chicken breast or tofu, quinoa or brown rice, salad\n" +
          "- **Snack**: Buttermilk or a small apple\n" +
          "- **Dinner**: Moong dal soup, sautéed veggies, small portion of rice or 1 roti\n" +
          "- **Before Bed**: Warm water with cinnamon or chamomile tea";
      } else {
        return "**🍽 Obesity Diet Plan** (Focus on Weight Loss & Satiety)\n" +
          "- **Breakfast**: Vegetable oats or smoothie with spinach, banana, and protein\n" +
          "- **Snack**: Green tea + 1 boiled egg or roasted chana\n" +
          "- **Lunch**: Steamed or grilled veggies, lean protein (chicken/tofu), salad\n" +
          "- **Snack**: Cucumber or tomato slices with lemon\n" +
          "- **Dinner**: Clear soup, lightly sautéed vegetables, 1 multigrain roti\n" +
          "- **Before Bed**: Herbal tea or warm turmeric milk (low-fat)";
      }
    }
  },
];

export default chatData;
