module.exports = {
    apps: [
        {
            name: 'STARTAI_TWO',
            script: './node_modules/npm/bin/npm-cli.js',
            args: 'start',
            watch: false,
            env: {
                NODE_ENV: 'STARTAI_TWO',
                PORT: 3052
            }
        }
    ]
}
