import cn from "clsx";
import type { FC, HTMLAttributes } from "react";

const Table_: FC<HTMLAttributes<HTMLTableElement>> = (props) => (
    <table
        {...props}
        className={cn("block overflow-x-auto", props.className)}
    />
);
const Th: FC<HTMLAttributes<HTMLTableCellElement>> = (props) => {
    return (
        <th
            {...props}
            className={cn(
                "m-0 border-b-2 whitespace-nowrap text-left py-1 px-2",
                props.className,
            )}
        />
    );
};
const Tr: FC<HTMLAttributes<HTMLTableRowElement>> = (props) => {
    return <tr {...props} className={cn("m-0 border-b ", props.className)} />;
};
const Td: FC<HTMLAttributes<HTMLTableCellElement>> = (props) => {
    return <td {...props} className={cn("m-0 py-1 px-2", props.className)} />;
};

/**
 * A collection of built-in components designed to create styled, non-markdown
 * (i.e., literal) HTML tables.
 *
 * @example
 * <Table className="mt-6">
 *   <thead>
 *     <Table.Tr>
 *       <Table.Th>Country</Table.Th>
 *       <Table.Th>Flag</Table.Th>
 *     </Table.Tr>
 *   </thead>
 *   <tbody>
 *     <Table.Tr>
 *       <Table.Td>France</Table.Td>
 *       <Table.Td>🇫🇷</Table.Td>
 *     </Table.Tr>
 *     <Table.Tr>
 *       <Table.Td>Ukraine</Table.Td>
 *       <Table.Td>🇺🇦</Table.Td>
 *     </Table.Tr>
 *   </tbody>
 * </Table>
 *
 * @usage
 * ```mdx
 * import { Table } from 'nextra/components'
 *
 * <Table>
 *   <thead>
 *     <Table.Tr>
 *       <Table.Th>Country</Table.Th>
 *       <Table.Th>Flag</Table.Th>
 *     </Table.Tr>
 *   </thead>
 *   <tbody>
 *     <Table.Tr>
 *       <Table.Td>France</Table.Td>
 *       <Table.Td>🇫🇷</Table.Td>
 *     </Table.Tr>
 *     <Table.Tr>
 *       <Table.Td>Ukraine</Table.Td>
 *       <Table.Td>🇺🇦</Table.Td>
 *     </Table.Tr>
 *   </tbody>
 * </Table>
 * ```
 */
export const Table = Object.assign(Table_, {
    Th,
    Tr,
    Td,
});
