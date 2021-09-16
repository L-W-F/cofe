import React from 'react';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb as ChakraBreadcrumb,
} from '@chakra-ui/react';

export const Breadcrumb = ({ items }) => (
  <ChakraBreadcrumb>
    {items.map(({ name, href, label, isActive: isCurrentPage }) => (
      <BreadcrumbItem key={name} isCurrentPage={isCurrentPage}>
        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    ))}
  </ChakraBreadcrumb>
);
