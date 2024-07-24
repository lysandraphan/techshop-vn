import { useEffect } from "react";
import lodash from "lodash";
import NextLink from "next/link";

// internal
import { fetchOrders, OrderData } from "@/redux/features/order-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// mui
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { displayPrice, formatDate } from "@/utils/functions";

interface OrderHistorySectionProps {
  accountId: number;
}

export default function OrderHistorySection({
  accountId,
}: OrderHistorySectionProps) {
  // -------------------------- VAR --------------------------
  const dispatch = useAppDispatch();

  let orders = useAppSelector((state) => state.order.orders);
  orders = lodash.orderBy(orders, ["orderId"], ["desc"]);

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchOrders({ accountId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------- MAIN --------------------------

  return (
    <Table size="medium">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Total</TableCell>
          <TableCell align="right">More Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders &&
          orders.map((order: OrderData) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
              {order.status === 1 ? (
                <TableCell sx={{ color: "blue", fontWeight: 500 }}>
                  ORDER PLACED
                </TableCell>
              ) : order.status === 2 ? (
                <TableCell sx={{ color: "orange", fontWeight: 500 }}>
                  IN PROGRESS
                </TableCell>
              ) : order.status === 3 ? (
                <TableCell sx={{ color: "green", fontWeight: 500 }}>
                  COMPLETED
                </TableCell>
              ) : (
                <TableCell sx={{ color: "red", fontWeight: 500 }}>
                  CANCELLED
                </TableCell>
              )}
              <TableCell>{formatDate(order.orderTime)}</TableCell>
              <TableCell>
                {order.totalPrice ? displayPrice(order.totalPrice) : "$0"}
              </TableCell>
              <TableCell align="right">
                <Link href="/login" component={NextLink} sx={{ color: "blue" }}>
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
