import MyProjectsCreateForm from "./my-projects-create-form";
import MyProjectsCreateHeader from "./my-projects-create-header";

export default function MyProjectsCreateLayout() {
    return (
        <section className="space-y-12">
            <MyProjectsCreateHeader />
            <MyProjectsCreateForm />
        </section>
    );
}