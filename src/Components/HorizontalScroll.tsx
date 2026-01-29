import * as React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'


/**
 * A container component that enables horizontal scrolling for its children.
 * It automatically applies a flex layout to arrange children in a row.
 *
 * @param {BoxProps} props - Props passed to the underlying MUI Box component, including className for Tailwind styling.
 */
export const HorizontalScrollContainer: React.FC<BoxProps> = ({
  children,
  className,
  ...props
}) => {
  // Use Tailwind classes to enforce a horizontal flex layout and enable scrolling.
  // - flex: Enables flexbox.
  // - flex-row: Lays out items horizontally.
  // - overflow-x-scroll: Enables horizontal scrolling when content overflows.
  // - whitespace-nowrap: Prevents inner content from wrapping, ensuring it stays on one line.
  return (
    <Box
      className={`flex flex-row overflow-x-scroll whitespace-nowrap scroll-smooth ${className}`}
      {...props}
    >
      {children}
    </Box>
  )
}