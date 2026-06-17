INSERT INTO makeup_looks (
  id,
  name,
  category,
  difficulty,
  occasion,
  time_to_complete,
  products,
  description,
  tip,
  image
) VALUES
(
  'soft-glam',
  'Soft Glam',
  'Glam',
  'Medium',
  'Dinner, party, photoshoot',
  '35 minutes',
  ARRAY['Foundation', 'concealer', 'neutral eyeshadow', 'lashes', 'nude lipstick'],
  'A polished makeup look with smooth skin, blended eyeshadow, lashes, and a nude lip.',
  'Blend brown eyeshadow into the crease slowly for a softer finish.',
  '/images/soft-glam.png'
),
(
  'clean-girl-makeup',
  'Clean Girl Makeup',
  'Everyday',
  'Easy',
  'School, errands, casual day',
  '15 minutes',
  ARRAY['Tinted moisturizer', 'brow gel', 'cream blush', 'mascara', 'lip gloss'],
  'A fresh and natural look focused on glowing skin, brushed brows, and glossy lips.',
  'Use cream blush on both your cheeks and lips for a matching look.',
  '/images/clean-girl.png'
),
(
  'grunge-eyeliner',
  'Grunge Eyeliner',
  'Edgy',
  'Medium',
  'Concert, night out, alternative outfit',
  '25 minutes',
  ARRAY['Black eyeliner', 'mascara', 'gray eyeshadow', 'brow pencil', 'matte lipstick'],
  'A bold makeup look with smudged black liner, darker eyeshadow, and a moody lip.',
  'Smudge the eyeliner before it dries to get a messy, smoky effect.',
  '/images/grunge-eyeliner.png'
),
(
  'pink-coquette-look',
  'Pink Coquette Look',
  'Cute / Romantic',
  'Easy',
  'Brunch, date, school event',
  '20 minutes',
  ARRAY['Pink blush', 'highlighter', 'mascara', 'pink lip tint', 'shimmer eyeshadow'],
  'A soft pink makeup look with rosy cheeks, sparkly eyes, and glossy lips.',
  'Add blush across the nose for a sweeter, doll-like effect.',
  '/images/pink-coquette.png'
),
(
  'glitter-festival-makeup',
  'Glitter Festival Makeup',
  'Creative',
  'Hard',
  'Festival, party, concert, themed event',
  '45 minutes',
  ARRAY['Glitter', 'face gems', 'colorful eyeshadow', 'highlighter', 'setting spray'],
  'A bold and sparkly makeup look with glitter, gems, and bright colors.',
  'Use cosmetic-safe glitter only, especially near your eyes.',
  '/images/glitter-festival.png'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  occasion = EXCLUDED.occasion,
  time_to_complete = EXCLUDED.time_to_complete,
  products = EXCLUDED.products,
  description = EXCLUDED.description,
  tip = EXCLUDED.tip,
  image = EXCLUDED.image;
