declare module 'google-client-api' {
    /// <reference types='gapi' />
    /// <reference types='gapi.auth2' />
    /// <reference types='gapi.client.drive' />
    /// <reference types='gapi.client.sheets' />

    export type GAPI = typeof gapi;

    function googleapi(): Promise<GAPI>;

    export = googleapi;
}

declare module 'ducky' {
    namespace ducky.validate {
        function compile(spec: string): object;

        function execute<T>(
            object: object,
            ast: AST<T>,
            errors?: string[]
        ): object is T;
        function execute(
            object: object,
            ast: object,
            errors?: string[]
        ): boolean;
    }

    export interface AST<T> {}

    export = ducky;
}
