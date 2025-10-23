import { hashPassword } from './libs/shares/src/utils/bcrypt';

async function generateHash() {
    const newPassword = 'Kien123ns@';
    const hashedPassword = await hashPassword(newPassword);

    console.log('\n==============================================');
    console.log('Password Hash Generator');
    console.log('==============================================');
    console.log('Plain Password:', newPassword);
    console.log('Hashed Password:', hashedPassword);
    console.log('==============================================\n');
    console.log('Copy this hashed password to update your database:');
    console.log(hashedPassword);
    console.log('\n');
}

generateHash().catch(console.error);
