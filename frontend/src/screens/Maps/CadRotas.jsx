import React from "react";

import Direction from "components/Direction/Direction.jsx"; 
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";

const modesOfTraveling = [
    {
        label: "Driving",
        value: "DRIVING"
    },
    {
        label: "Walking",
        value: "WALKING"
    },
    {
        label: "Bicycling",
        value: "BICYCLING"
    },
    {
        label: "Transit",
        value: "TRANSIT"
    }
];

let CadRotas = () => (
    <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={4} />
            <GridItem xs={12} sm={12} md={4}>
                <Select options={modesOfTraveling}
                    value={modesOfTraveling[0]}
                    onChange={() => { }}
                    placeholder={"Selecione :"}
                    noOptionsMessage={() => "Não há rotas disponíveis !"} />
            </GridItem>
            <GridItem xs={12} sm={12} md={4} />
            <GridItem xs={12} sm={12} md={12}>
                <Direction />
            </GridItem>
        </GridContainer>
    </div>
);



export default CadRotas;
