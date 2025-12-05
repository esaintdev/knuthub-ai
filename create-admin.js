const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n🔐 Admin User Creator\n');

rl.question('Enter admin email: ', (email) => {
    rl.question('Enter admin password: ', (password) => {
        rl.question('Enter admin name: ', (name) => {

            // Hash the password
            const hash = bcrypt.hashSync(password, 10);

            console.log('\n✅ Admin credentials generated!\n');
            console.log('📋 Copy and paste this SQL into Supabase SQL Editor:\n');
            console.log('---------------------------------------------------');
            console.log(`INSERT INTO users (email, password, name, role) VALUES`);
            console.log(`('${email}', '${hash}', '${name}', 'admin');`);
            console.log('---------------------------------------------------\n');
            console.log('📝 Steps to complete:');
            console.log('1. Go to your Supabase project dashboard');
            console.log('2. Click "SQL Editor" in the left sidebar');
            console.log('3. Paste the SQL above');
            console.log('4. Click "Run"');
            console.log('5. Login at http://localhost:3000/login with your email and password');
            console.log('6. Navigate to http://localhost:3000/admin\n');

            rl.close();
        });
    });
});
