/**
 * Adds an optional className prop to any type T.
 * If T is not provided, it defaults to an empty object.
 */
export type WithClassName<T = {}> = T & {
    className?: string;
};

/**
 * A type for components that don't need any props other than className.
 */
export type ClassNameOnlyProps = WithClassName;