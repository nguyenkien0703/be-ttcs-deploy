import configuration from '@app/shares/config/configuration'
import * as bcrypt from 'bcrypt'
export const comparePasswordUser = async (
    plainPassword,
    encryptedPassword,
): Promise<boolean> => {
    return await bcrypt.compare(
        plainPassword + configuration().api.secretUserPasswordKey,
        encryptedPassword,
    )
}

export const hashPassword = async (plainPassword: string) => {
    return await bcrypt.hash(
        plainPassword + configuration().api.secretUserPasswordKey,
        10,
    )
}
