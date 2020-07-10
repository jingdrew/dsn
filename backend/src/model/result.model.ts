class Result<T> {
    data: T | Error;
    code: string

    constructor(data: T | Error, code: string) {
        this.data = data;
        this.code = code;
    }

    public hasError() {
        return this.data instanceof Error;
    }

    public getError() {
        return this.hasError() ? this.data as Error : undefined;
    }

    public getData() {
        return this.hasError() ? undefined : this.data as Error;
    }
}

export default Result;