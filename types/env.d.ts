declare module "@env" {
  export const REACT_APP_NHOST_SUBDOMAIN: string;
  export const REACT_APP_NHOST_REGION: string;
  export const REACT_APP_NHOST_BACKEND_URL: string;

  // other ones
}
declare module "*.png" {
  const value: import("react-native").ImageSourcePropType;
  export default value;
}
