"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

// Styles
import styles from "../Header.module.css";

export default function NavLink({url, label}){
    const path = usePathname();
    return (
        <li>
            <Link href={url} className={path.startsWith(`${url}`) ? styles.active: undefined}>{label}</Link>
        </li>
    );
}