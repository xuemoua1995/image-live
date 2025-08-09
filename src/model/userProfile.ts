interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

type UserType = {
    id: string;
    given_name: string;
    family_name: string;
    email: string;
    phone:string;
    token: string | null;
    picture: string | null;
  } | null;

  interface UserEdit {
    _id: string;
    fname: string;
    gname: string;
    phone: number;
    email: string;
    isActive: boolean;
    userType: 0 | 1 | 2;
    createDate: number;
    updateDate: number;
    exp: number;
    lat: number;
}