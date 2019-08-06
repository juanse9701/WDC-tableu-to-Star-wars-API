(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    const opts = { crossDomain: true};
    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "height",
            alias: "height",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "mass",
            alias: "mass",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "hair_color",
            alias: "hair_color",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "skin_color",
            alias: "skin_color",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableInfo = {
            id: "SWA",
            alias: "Star Wars api",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };


    const createTable = function (feat) {
        tableData = [];
            // Iterate over the JSON object
            // alert(feat[0].name)
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "name": feat[i].name,
                    "height": feat[i].height,
                    "mass": feat[i].mass,
                    "hair_color": feat[i].hair_color,
                    "skin_color": feat[i].skin_color
                });
            }

            return tableData;
    }


    // Download the data
    myConnector.getData = function(table, doneCallback) {
        /**
         * el metodo get recibe la url de los datos y un callback que va a tratarlos
         */
        $.get("https://swapi.co/api/people/", function (resp) {
            // var feat = resp.features,
            var feat = resp.results // dependiendo del api el ().results puede cambiar, inclusive puede no ir, depende que devuelva el API.
            table.appendRows(createTable(feat));
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    // Create event listeners for when the user submits the form
})();

$(document).ready(function() {
    console.log('llega');
    setTimeout(function () {
        tableau.connectionName = "Star wars api"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    }, 500)
});