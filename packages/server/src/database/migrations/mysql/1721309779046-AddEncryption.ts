import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddEncryption1721308320215 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS \`encryption\` (\`id\` VARCHAR(36) PRIMARY KEY NOT NULL, \`name\` VARCHAR(255) NOT NULL, \`encryptionKey\` VARCHAR(255) NOT NULL, \`createdDate\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6));`
        )
        try {
            await queryRunner.query(`CREATE INDEX \`encryption_idx\` ON \`encryption\` (\`id\`);`)
            await queryRunner.query(`CREATE INDEX \`credential_idx\` ON \`credential\` (\`id\`);`)
        } catch (error) {
            //index already exists
        }
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS \`encryption_credential\` (\`id\` VARCHAR(255) PRIMARY KEY NOT NULL, \`encryptionId\` VARCHAR(36) NOT NULL, \`credentialId\` VARCHAR(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, \`createdDate\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), FOREIGN KEY (\`encryptionId\`) REFERENCES \`encryption\`(\`id\`), FOREIGN KEY (\`credentialId\`) REFERENCES \`credential\`(\`id\`));`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`encryption_credential\`;`)
        await queryRunner.query(`DROP TABLE IF EXISTS \`encryption\`;`)
    }
}