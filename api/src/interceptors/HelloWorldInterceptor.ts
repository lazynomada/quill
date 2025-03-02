import HelloWorldService from "@/services/HelloWorldService";

export default class HelloWorldInterceptor {
    protected service: HelloWorldService;

    constructor() {
        this.service = new HelloWorldService()
    }

    get(name: string) {
        if (name === "mj") return { error: 'name.not.allowed' }
        return { data: this.service.getByName(name) }
    }
}