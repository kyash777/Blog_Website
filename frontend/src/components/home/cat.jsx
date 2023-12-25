import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  styled,
} from "@mui/material";
import {Link,useSearchParams} from "react-router-dom"

import { categories } from "../../constants/data.js";

const StyledTable=styled(Table)`
    border:1px solid rgba(224, 224, 224 ,1)
`

const StyledButton=styled(Button)`
  margin:20px;
  width:85%;
  background:#6459ED;
  color:#fff;
  
`

const Cat = () => {

  const [searchParams]=useSearchParams()
  const category=searchParams.get("category")
  return (
    <>
      <Link to={`/create?category=${category || ''}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <Link style={{textDecoration:"none"}} to="/">
              <TableCell>All Categories</TableCell>
            </Link>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            categories.map(category=>(
              <TableRow key={category.id}>
                <Link style={{textDecoration:"none"}}  to={`/?category=${category.type}`}>
                  <TableCell>{category.type}</TableCell>
                </Link>
              </TableRow>
            ))
          }
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Cat;
