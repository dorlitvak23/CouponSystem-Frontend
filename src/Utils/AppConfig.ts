class AppConfig {
    public loginUrl = "http://localhost:8080/api/login"
    public adminUrl = "http://localhost:8080/api/admin/"
    public companyUrl = "http://localhost:8080/api/company/"
    public customerUrl = "http://localhost:8080/api/customer/"

}

const appConfig = new AppConfig(); 

export default appConfig;