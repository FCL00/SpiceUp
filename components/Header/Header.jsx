import Link from "next/link";
import Image from "next/image";
import NavLink from "./partial/NavLink";

// Image
import LogoImg from "@/assets/logo.png";

// Styles
import styles from "@/components/Header/Header.module.css";


export default function Header(){

    return (
       <header className={styles['header']}>
            <Link className={styles['logo']} href="/">
                <Image src={LogoImg} alt="A plate with food in it"  priority/>
                Spice Up
            </Link>

            <nav className={styles['nav']}>
                <ul>
                    <NavLink url="/meals" label="Browse Meals"/>
                    <NavLink url="/community" label="Foodies Community"/>
                </ul>
            </nav>
       </header>
    );
}