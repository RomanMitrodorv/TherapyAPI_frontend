import { DomSanitizer } from '@angular/platform-browser';

export class ViewHelper {
    static buildRatingStars(rating: number, domSanitizer: DomSanitizer) {

        const stars = {
            full: domSanitizer.bypassSecurityTrustUrl(`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNTI0NDcgMS40NjM1M0M4LjY3NDE1IDEuMDAyODcgOS4zMjU4NSAxLjAwMjg3IDkuNDc1NTMgMS40NjM1M0wxMS4xMzI5IDYuNTY0MzRDMTEuMTk5OCA2Ljc3MDM1IDExLjM5MTggNi45MDk4MyAxMS42MDg0IDYuOTA5ODNIMTYuOTcxN0MxNy40NTYxIDYuOTA5ODMgMTcuNjU3NSA3LjUyOTY0IDE3LjI2NTYgNy44MTQzNEwxMi45MjY2IDEwLjk2NjhDMTIuNzUxNCAxMS4wOTQxIDEyLjY3OCAxMS4zMTk4IDEyLjc0NSAxMS41MjU4TDE0LjQwMjMgMTYuNjI2NkMxNC41NTIgMTcuMDg3MyAxNC4wMjQ4IDE3LjQ3MDQgMTMuNjMyOSAxNy4xODU3TDkuMjkzODkgMTQuMDMzMkM5LjExODY1IDEzLjkwNTkgOC44ODEzNSAxMy45MDU5IDguNzA2MTEgMTQuMDMzMkw0LjM2NzEgMTcuMTg1N0MzLjk3NTI0IDE3LjQ3MDQgMy40NDggMTcuMDg3MyAzLjU5NzY4IDE2LjYyNjZMNS4yNTUwMyAxMS41MjU4QzUuMzIxOTcgMTEuMzE5OCA1LjI0ODY0IDExLjA5NDEgNS4wNzMzOSAxMC45NjY4TDAuNzM0Mzg0IDcuODE0MzRDMC4zNDI1MjcgNy41Mjk2NCAwLjU0MzkxNSA2LjkwOTgzIDEuMDI4MjggNi45MDk4M0g2LjM5MTU5QzYuNjA4MiA2LjkwOTgzIDYuODAwMTggNi43NzAzNSA2Ljg2NzEyIDYuNTY0MzRMOC41MjQ0NyAxLjQ2MzUzWiIgZmlsbD0iI0ZGREI1OSIgc3Ryb2tlPSIjREVCQTM5Ii8+Cjwvc3ZnPgo=`),
            half: domSanitizer.bypassSecurityTrustUrl(`<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNTI0NDcgMS40NjM1MkM3LjY3NDE1IDEuMDAyODcgOC4zMjU4NSAxLjAwMjg3IDguNDc1NTMgMS40NjM1M0w5LjY4Mzg2IDUuMTgyMzdDOS43NTA3OSA1LjM4ODM4IDkuOTQyNzcgNS41Mjc4NiAxMC4xNTk0IDUuNTI3ODZIMTQuMDY5NkMxNC41NTQgNS41Mjc4NiAxNC43NTU0IDYuMTQ3NjcgMTQuMzYzNSA2LjQzMjM3TDExLjIwMDEgOC43MzA3NUMxMS4wMjQ4IDguODU4MDcgMTAuOTUxNSA5LjA4Mzc1IDExLjAxODQgOS4yODk3NkwxMi4yMjY4IDEzLjAwODZDMTIuMzc2NCAxMy40NjkzIDExLjg0OTIgMTMuODUyMyAxMS40NTczIDEzLjU2NzZMOC4yOTM4OSAxMS4yNjkzQzguMTE4NjUgMTEuMTQxOSA3Ljg4MTM1IDExLjE0MTkgNy43MDYxMSAxMS4yNjkzTDQuNTQyNjcgMTMuNTY3NkM0LjE1MDgxIDEzLjg1MjMgMy42MjM1NyAxMy40NjkzIDMuNzczMjUgMTMuMDA4Nkw0Ljk4MTU3IDkuMjg5NzZDNS4wNDg1MSA5LjA4Mzc1IDQuOTc1MTggOC44NTgwNyA0Ljc5OTk0IDguNzMwNzVMMS42MzY1IDYuNDMyMzdDMS4yNDQ2NCA2LjE0NzY3IDEuNDQ2MDMgNS41Mjc4NiAxLjkzMDM5IDUuNTI3ODZINS44NDA2MkM2LjA1NzIzIDUuNTI3ODYgNi4yNDkyMSA1LjM4ODM4IDYuMzE2MTQgNS4xODIzN0w3LjUyNDQ3IDEuNDYzNTJaIiBmaWxsPSIjRkZGQUU3IiBzdHJva2U9IiNFNENCNkYiLz4KPHBhdGggZD0iTTQuNTQyNzIgMTMuNTY3Nkw3LjgyNDQ4IDExLjE4MzNDNy45MjkxNyAxMS4xMDcyIDguMDcwOTMgMTEuMTA3MiA4LjE3NTYyIDExLjE4MzNDOC4zNzMwNyAxMS4zMjY3IDguNjQ5ODkgMTEuMTg1NyA4LjY0OTg5IDEwLjk0MTZWMi4wNzkxOUM4LjY0OTg5IDIuMDI2NzIgOC42NDE2MyAxLjk3NDU4IDguNjI1NDIgMS45MjQ2OEw4LjQ3NTU4IDEuNDYzNTNDOC4zMjU5MSAxLjAwMjg3IDcuNjc0MiAxLjAwMjg3IDcuNTI0NTMgMS40NjM1Mkw2LjMxNjIgNS4xODIzN0M2LjI0OTI2IDUuMzg4MzggNi4wNTcyOCA1LjUyNzg2IDUuODQwNjcgNS41Mjc4NkgxLjkzMDQ0QzEuNDQ2MDggNS41Mjc4NiAxLjI0NDY5IDYuMTQ3NjcgMS42MzY1NSA2LjQzMjM3TDQuNzk5OTkgOC43MzA3NUM0Ljk3NTIzIDguODU4MDcgNS4wNDg1NiA5LjA4Mzc1IDQuOTgxNjMgOS4yODk3NkwzLjc3MzMgMTMuMDA4NkMzLjYyMzYyIDEzLjQ2OTMgNC4xNTA4NiAxMy44NTIzIDQuNTQyNzIgMTMuNTY3NloiIGZpbGw9IiNGRkRCNTkiIHN0cm9rZT0iI0U0Q0I2RiIvPgo8L3N2Zz4K`),
            empty: domSanitizer.bypassSecurityTrustUrl(`<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNTI0NDcgMS40NjM1MkM3LjY3NDE1IDEuMDAyODcgOC4zMjU4NSAxLjAwMjg3IDguNDc1NTMgMS40NjM1M0w5LjY4Mzg2IDUuMTgyMzdDOS43NTA3OSA1LjM4ODM4IDkuOTQyNzcgNS41Mjc4NiAxMC4xNTk0IDUuNTI3ODZIMTQuMDY5NkMxNC41NTQgNS41Mjc4NiAxNC43NTU0IDYuMTQ3NjcgMTQuMzYzNSA2LjQzMjM3TDExLjIwMDEgOC43MzA3NUMxMS4wMjQ4IDguODU4MDcgMTAuOTUxNSA5LjA4Mzc1IDExLjAxODQgOS4yODk3NkwxMi4yMjY4IDEzLjAwODZDMTIuMzc2NCAxMy40NjkzIDExLjg0OTIgMTMuODUyMyAxMS40NTczIDEzLjU2NzZMOC4yOTM4OSAxMS4yNjkzQzguMTE4NjUgMTEuMTQxOSA3Ljg4MTM1IDExLjE0MTkgNy43MDYxMSAxMS4yNjkzTDQuNTQyNjcgMTMuNTY3NkM0LjE1MDgxIDEzLjg1MjMgMy42MjM1NyAxMy40NjkzIDMuNzczMjUgMTMuMDA4Nkw0Ljk4MTU3IDkuMjg5NzZDNS4wNDg1MSA5LjA4Mzc1IDQuOTc1MTggOC44NTgwNyA0Ljc5OTk0IDguNzMwNzVMMS42MzY1IDYuNDMyMzdDMS4yNDQ2NCA2LjE0NzY3IDEuNDQ2MDMgNS41Mjc4NiAxLjkzMDM5IDUuNTI3ODZINS44NDA2MkM2LjA1NzIzIDUuNTI3ODYgNi4yNDkyMSA1LjM4ODM4IDYuMzE2MTQgNS4xODIzN0w3LjUyNDQ3IDEuNDYzNTJaIiBmaWxsPSIjRkZGQUU3IiBzdHJva2U9IiNFNENCNkYiLz4KPC9zdmc+Cg==`)
        };

        if (rating == 5) {
            return `<img src="${stars.full}" /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} />`;
        } else if (rating > 4 && rating < 5) {
            return `<img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.half} />`;
        } else if (rating == 4) {
            return `<img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.empty} />`;
        } else if (rating > 3 && rating < 4) {
            return `<img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.half} /> <img src=${stars.empty} />`;
        } else if (rating == 3) {
            return `<img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else if (rating > 2 && rating < 3) {
            return `<img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.half} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else if (rating == 2) {
            return `<img src=${stars.full} /> <img src=${stars.full} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else if (rating > 1 && rating < 2) {
            return `<img src=${stars.full} /> <img src=${stars.half} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else if (rating == 1) {
            return `<img src=${stars.full} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else if (rating > 0 && rating < 1) {
            return `<img src=${stars.half} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else if (rating == 0) {
            return `<img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        } else {
            return `<img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} /> <img src=${stars.empty} />`;
        }
    }
}