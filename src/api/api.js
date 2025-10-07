
const BASE_URL="https://stockvoyager.onrender.com/api/v1";

export const authenticationEndpoints={
    LOGIN_API:BASE_URL+"/auth/login", 
    SENDOTP_API:BASE_URL+"/auth/sendOTP", 
    SIGNUP_API:BASE_URL+"/auth/signUp",
    RESETPASSWORD_API:BASE_URL+"/auth/resetPassword",
    RESETPASSTOKEN_API:BASE_URL+"/auth/resetPasswordToken",
}

export const updationEndpoints={
    UPDATE_DP_API:BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_DETAILS_API:BASE_URL+"/profile/updateProfile",
    UPDATE_PASSWORD_API:BASE_URL+"/auth/changePassword",
}

export const watchlistEndpoints={
    ADD_TO_WATCHLIST_API:BASE_URL+"/watchlist/addToWatchlist",
    REMOVE_FROM_WATCHLIST_API:BASE_URL+"/watchlist/removeFromWatchlist"
}

export const stockOperationsEndpoints={
    BUY_STOCK_API:BASE_URL+"/stock/buyStock",
    SELL_STOCK_API:BASE_URL+"/stock/sellStock"
}

export const graphEndpoints={
    GRAPH_POINT_ADDITION_API:BASE_URL+"/graph/addToGraph"
}

export const transactionEndpoints={
    DELETE_TRANSACTION_API:BASE_URL+"/transaction/deleteTransaction"
} 

export const newsEndpoints={
    ADD_NEWS_API:BASE_URL+"/news/addNews",
    GET_ALL_NEWS_API:BASE_URL+"/news/getAllNews"
} 


export const adminRoutes={
    UPDATE_ALL_STOCK_CURR_PRICE_API:BASE_URL+"/stockPrice/updateCurrPrice",
    UPDATE_EVERYONE_PORTFOLIO_AMT_API:BASE_URL+"/stockPrice/updatePortfolioAmt",
    UPDATE_ALL_GRAPH_API:BASE_URL+"/graph/updateEveryoneGraph",
}