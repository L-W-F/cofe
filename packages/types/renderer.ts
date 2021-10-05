export interface CofeRendererProps {
  isDesign?: boolean;
}

export interface CofeRenderer {
  (props: CofeRendererProps & Record<string, any>): JSX.Element;
}
