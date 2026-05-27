const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
const fs = require('fs');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_URL='))?.split('=')[1];
const supabaseAnonKey = envLines.find(line => line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY='))?.split('=')[1];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateHorrorPosters() {
  const updates = [
    {
      id: 16,
      image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=750&fit=crop'
    },
    {
      id: 17,
      image_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=750&fit=crop'
    },
    {
      id: 18,
      image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=750&fit=crop'
    }
  ];

  for (const update of updates) {
    console.log(`Updating poster ${update.id}...`);
    const { error } = await supabase
      .from('posters')
      .update({ image_url: update.image_url })
      .eq('id', update.id);

    if (error) {
      console.error(`Error updating poster ${update.id}:`, error);
    } else {
      console.log(`✓ Successfully updated poster ${update.id}`);
    }
  }

  console.log('\nAll updates completed!');
}

updateHorrorPosters().catch(console.error);
