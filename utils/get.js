import gun from "../Config/DbProvider";

const get = async () => {

        let reports = [];

        gun.get('reports').map().on((report) => {
            if (report) {
                reports.push(report);
            }
        });


      return reports;

};

export default get;
