function registerAllBlocks(blocks){

blocks.register({
    name: "Operator",
    description: "To specify an operator",
    fields: [
        {
            name: "Name",
            type: "string",
            defaultValue: "unknown",
            attrs: "editable"
        },     
        {
            name: "Description",
            type: "longtext",
            defaultValue: "fogflow",
            attrs: "editable"
        },    
        {
            name: "DockerConfigs",
            type: "DockerConfig",
            attrs: "input"
        },    
        {
            name: "InputParameters",
            type: "Parameter",
            attrs: "input"
        }
    ]
});

blocks.register({
    name: "DockerConfig",
    description: "To specify the required docker configuraiton to run this operator",
    fields: [
        {
            name: "Category",
            choices: ["Service_Port", "With_Privileged", "Mount_Volume"],
            attrs: "editable"
        },{
            name: "Value",
            type: "string",
            attrs: "editable"
        },
        {
            name: "DockerConfig",
            type: "DockerConfig",
            attrs: "output"
        }        
    ]
});

blocks.register({
    name: "InputParameter",
    description: "To specify an controllable parameter of the operator",
    fields: [
        {
            name: "Name",
            type: "string",
            attrs: "editable"
        },{
            name: "Values",
            type: "string[]",
            defaultValue: ["default"],
            attrs: "editable"
        },
        {
            name: "Parameter",
            type: "Parameter",
            attrs: "output"
        }        
    ]
});

}



