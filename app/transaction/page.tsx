"use client";

import {DateTime} from "luxon"

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";

import { getTransactions, TransactionDisplay } from "@/utils/transactionHandler";
import Grid from "@mui/material/Grid2";
import {
    Button,
    Checkbox,
    Chip,
    Fab,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    DashboardOutlined,
    ReceiptLongOutlined,
    ReceiptOutlined,
    SubscriptionsOutlined,
    PermIdentityOutlined,
    AccountBalanceWalletOutlined,
    CalendarMonthOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const dashboardItem = [
    ["Dashboard", <DashboardOutlined />],
    ["Transaction", <ReceiptLongOutlined />],
    ["Debt", <ReceiptOutlined />],
    ["Subscription", <SubscriptionsOutlined />],
    ["Wallet", <AccountBalanceWalletOutlined />],
    ["Identity", <PermIdentityOutlined />],
];

interface TransactionDashboard {
    id: number;
    issue_date: string;
    wallet: string;
    in_out: boolean;
    amount: number;
    category: string;
    status: number;
}

function createData(
    id: number,
    issue_date: string,
    wallet: string,
    in_out: boolean,
    amount: number,
    category: string,
    status: number
): TransactionDashboard {
    return {
        id,
        issue_date,
        wallet,
        in_out,
        amount,
        category,
        status,
    };
}

function renderStatus(value: number) {
    if (value == 2)
        return (
            <Chip
                label="Done"
                sx={{
                    backgroundColor: "#E5FAE6",
                    color: "#297B32",
                    fontWeight: "bold",
                }}
            />
        );
    if (value == 3)
        return (
            <Chip
                label="Cancel"
                sx={{
                    backgroundColor: "#FFEBEB",
                    color: "#E83838",
                    fontWeight: "bold",
                }}
            />
        );
    return (
        <Chip
            label="Pending"
            sx={{
                backgroundColor: "#FEF4E1",
                color: "#F9970C",
                fontWeight: "bold",
            }}
        />
    );
}

function renderDatetime(value: string) {
    let datetime = DateTime.now().setZone("system")
    return datetime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
}

const COLUMN_GRID_SIZE = [
    0.4, // Checkbox
    2, // Time
    1.5, // Amount
    1.25, // Wallet
    1, // Category
    1, // Subcategory
    1, // Status
]

// const data = [
//     createData(1, "10 Oct 22:00", "Momo", true, 10, "Travel", 1),
//     createData(1, "10 Oct 22:05", "Vietcombank", false, 1000000, "Eating", 2),
//     createData(1, "10 Oct 22:10", "Vietinbank", true, 50000000, "Shopping", 3),
//     createData(1, "10 Oct 22:15", "TP Bank", true, 10, "Subscription", 1),
//     createData(1, "10 Oct 22:20", "Techcombank", false, 15, "Travel", 3),
//     createData(1, "10 Oct 22:25", "Agribank", true, 18, "Travel", 2),
//     createData(1, "10 Oct 22:30", "Vietcombank", false, 100, "Other", 2),
//     createData(1, "10 Oct 22:35", "Vietinbank", true, 20, "Travel", 3),
//     createData(1, "10 Oct 22:40", "Techcombank", false, 204, "Eating", 1),
//     createData(1, "10 Oct 22:45", "Agribank", true, 22210, "Travel", 2),
//     createData(1, "10 Oct 22:50", "Vietcombank", false, 19, "Shopping", 1),
//     createData(1, "10 Oct 22:55", "Vietcombank", true, 10, "Travel", 3),
// ];

export default function PermanentDrawerLeft() {
    const rounter = useRouter();
    const [transactions, setTransactions] = useState<TransactionDisplay[]>([])
    const [show, setShow] = useState(0);

    useEffect(() => {
        getTransactions().then(value => {
            let transactions: TransactionDisplay[] = []

            // @ts-ignore
            value.forEach((element) => {
                let transaction: TransactionDisplay = {
                    issue_date: renderDatetime(element.issue_date)!,
                    wallet: element.wallet.name,
                    in_out: element.in_out,
                    amount: element.amount,
                    category: element.category.name,
                    subcategory: element.subcategory.name,
                    status_id: element.status_id
                }
                transactions.push(transaction)
            })

            setTransactions(transactions)
        });
    }, []);

    const handleAddTransaction = () => {
        rounter.push("/transaction/create");
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar sx={{ backgroundColor: "white", color: "black" }}>
                    <Typography variant="h6" noWrap component="div">
                        Welcome back, Sircle!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>
                    {dashboardItem.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={(event) => setShow(index)}>
                                <ListItemIcon>{item[1]}</ListItemIcon>
                                <ListItemText primary={item[0]} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {show == 0 && (
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
                >
                    <Toolbar />
                    <Typography sx={{ marginBottom: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Rhoncus dolor purus non enim praesent
                        elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum
                        quisque non tellus. Convallis convallis tellus id
                        interdum velit laoreet id donec ultrices. Odio morbi
                        quis commodo odio aenean sed adipiscing. Amet nisl
                        suscipit adipiscing bibendum est ultricies integer quis.
                        Cursus euismod quis viverra nibh cras. Metus vulputate
                        eu scelerisque felis imperdiet proin fermentum leo.
                        Mauris commodo quis imperdiet massa tincidunt. Cras
                        tincidunt lobortis feugiat vivamus at augue. At augue
                        eget arcu dictum varius duis at consectetur lorem. Velit
                        sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        Consequat mauris nunc congue nisi vitae suscipit.
                        Fringilla est ullamcorper eget nulla facilisi etiam
                        dignissim diam. Pulvinar elementum integer enim neque
                        volutpat ac tincidunt. Ornare suspendisse sed nisi lacus
                        sed viverra tellus. Purus sit amet volutpat consequat
                        mauris. Elementum eu facilisis sed odio morbi. Euismod
                        lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra
                        accumsan in. In hendrerit gravida rutrum quisque non
                        tellus orci ac. Pellentesque nec nam aliquam sem et
                        tortor. Habitant morbi tristique senectus et. Adipiscing
                        elit duis tristique sollicitudin nibh sit. Ornare aenean
                        euismod elementum nisi quis eleifend. Commodo viverra
                        maecenas accumsan lacus vel facilisis. Nulla posuere
                        sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            )}
            {show == 1 && (
                <Box sx={{ width: "100%" }}>
                    <Toolbar />
                    <Toolbar disableGutters>
                        <Button
                            variant="contained"
                            onClick={handleAddTransaction}
                        >
                            Add Transaction
                        </Button>
                    </Toolbar>
                    <Box>
                        <Grid container spacing={4} alignItems="center">
                            <Grid size={COLUMN_GRID_SIZE[0]}>
                                <Checkbox />
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[1]}>
                                <Typography>Time</Typography>
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[2]}>
                                <Typography>Amount</Typography>
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[3]}>
                                <Typography>Wallet</Typography>
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[4]}>
                                <Typography>Category</Typography>
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[5]}>
                                <Typography>Subcategory</Typography>
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[6]}>
                                <Typography>Status</Typography>
                            </Grid>
                            <Grid size={COLUMN_GRID_SIZE[7]}>
                                <Typography></Typography>
                            </Grid>
                        </Grid>

                        {transactions.map((record, index) => (
                            <Grid container spacing={4} alignItems="center" key={index}>
                                <Grid size={COLUMN_GRID_SIZE[0]}>
                                    <Checkbox />
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[1]}>
                                    <Typography>{record.issue_date}</Typography>
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[2]}>
                                    <Typography>
                                        {record.in_out == true ? "+ " : "- "}
                                        {Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(record.amount)}
                                    </Typography>
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[3]}>
                                    <Typography>{record.wallet}</Typography>
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[4]}>
                                    <Typography>{record.category}</Typography>
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[5]}>
                                    <Typography>{record.subcategory}</Typography>
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[6]}>
                                    {renderStatus(record.status_id)}
                                </Grid>
                                <Grid size={COLUMN_GRID_SIZE[7]}>
                                    <Typography></Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Box>
            )}
            {show == 2 && (
                <Box>
                    <Toolbar />
                    <Box>Debt</Box>
                </Box>
            )}
            {show == 3 && (
                <Box>
                    <Toolbar />
                    <Box>Subscription</Box>
                </Box>
            )}
            {show == 4 && (
                <Box>
                    <Toolbar />
                    <Box>Wallet</Box>
                </Box>
            )}
            {show == 5 && (
                <Box>
                    <Toolbar />
                    <Box>Identity</Box>
                </Box>
            )}
        </Box>
    );
}