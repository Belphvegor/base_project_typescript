class customeError extends Error {
    private code: number;
    private type: string;
    private error: any;
    constructor(message: string, code: number, type: string, error?: any) {
        super(message);
        this.name = 'customeError';
        this.code = code;
        this.type = type;
        this.error = error;
    }
}

export default customeError