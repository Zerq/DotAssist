/*
export class Template {
    public FullName: string;
    public Name: string;
    public Tags = new Array<string>();
    public Languages = new Array<string>();
}*/


export interface Template {
    $schema: string;
    author: string
    classifications: Array<string>;
    name: string;
    generatorVersions: string;
    description: string;
    groupIdentity: string;
    precedence: string;
    identity: string;
    shortName: string;
    tags: {
        language: string,
        type: string,
        [name: string]: string
    };
    sourceName: string;
    preferNameDirectory: boolean;
    baselines: {
        app: {
            description: string,
            defaultOverrides: { [name: string]: string }
        },
        standard: {
            description: "Target netstandard",
            defaultOverrides: { [name: string]: string }
        }
    };
    symbols: {
        TargetFrameworkOverride: {
            type: string,
            description: string,
            replaces: string,
            datatype: string,
            defaultValue: string,
            displayName: string
        },
        Framework: {
            type: string,
            description: string,
            datatype: string,
            choices: Array<{ [name: string]: string }>,
            replaces: string,
            defaultValue: string,
            displayName: string,
        },
        langVersion: {
            type: string,
            datatype: string,
            description: string,
            defaultValue: string,
            replaces: string,
            displayName: string
        },
        HostIdentifier: {
            type: string,
            binding: string
        },
        skipRestore: {
            type: string,
            datatype: string,
            description: string,
            defaultValue: string,
            displayName: string
        },
        csharp9orOlder: {
            type: string,
            generator: string,
            datatype: string,
            parameters: {
                pattern: string,
                source: string
            }
        },
        csharp7orOlder: {
            type: string,
            generator: string,
            datatype: string,
            parameters: {
                pattern: string,
                source: string
            }
        },
        csharp10orLater: {
            type: string,
            value: string
        },
        csharp8orLater: {
            type: string,
            value: string
        },
        csharpFeature_ImplicitUsings: {
            type: string,
            value: string
        },
        csharpFeature_FileScopedNamespaces: {
            type: string,
            value: string
        },
        csharpFeature_Nullable: {
            type: string,
            value: string
        }
    };
    primaryOutputs: [
        {
            path: string
        },
        {
            condition: string,
            path: string
        }
    ];
    defaultName: string;
    postActions: Array<{
        id: string,
        condition: string,
        description: string,
        manualInstructions: Array<{ "text": string }>,
        actionId: string,
        continueOnError: true
        args: { [name: string]: string }
    }>;    
}
