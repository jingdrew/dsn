class ResultModel<T> {
    data: T | Error;
    status: number;

    constructor(data: T | Error, status: number) {
        this.data = data;
        this.status = status;
    }

    public isError() {
        return this.data instanceof Error;
    }

    public getError() {
        return this.isError() ? this.data as Error : undefined;
    }

    public getData() {
        return this.isError() ? undefined : this.data as Error;
    }
}

export default ResultModel;