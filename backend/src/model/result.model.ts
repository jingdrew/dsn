class Result<T> {
    data: T | Error;

    constructor(data: T | Error) {
        this.data = data;
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