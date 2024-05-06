type ResolverType = 'component' | 'directive';
export declare function ComComponentsResolver(): {
    type: ResolverType;
    resolve: (name: string) => Promise<{
        name: string;
        from: string;
    } | undefined>;
}[];
export {};
