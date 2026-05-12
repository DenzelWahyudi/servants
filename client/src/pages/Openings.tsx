import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { OpeningsCard } from "../components/OpeningsCard";

export function Openings() {
    return(
        <div className="mx-auto px-12 py-5 flex flex-col gap-13">
            <Header variant="openings" />
            <Heading>Openings</Heading>
                <div className="-mt-7 flex flex-wrap gap-4">
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                    <OpeningsCard serviceName="Service name" date="Sep 23, 2024" time="1:00pm" role="Role Needed"/>
                </div>
            <Footer churchName="Gereja Sidang Kristus" location="Kelapa Gading" phone="+6289682115180" email="gskkelapagading@gmail.com" />
        </div>
    )
}
