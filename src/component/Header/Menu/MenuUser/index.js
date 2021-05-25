// image
import logoAdidas from "image/iconMenu/adidas.png";
import logoNike from "image/iconMenu/nike.png";
import logoVans from "image/iconMenu/Vans.png";
import logoNewBanner from "image/iconMenu/newBalance.png";
import logoPuma from "image/iconMenu/puma.png";
import logoConverse from "image/iconMenu/converse.png";
export default function MenuUser({ list_menu, onClickCloseMenu, Link }) {
  const { Adidas } = list_menu.listMenu;
  const { Nike } = list_menu.listMenu;
  const { Vans } = list_menu.listMenu;
  const { NewBalance } = list_menu.listMenu;
  const { Puma } = list_menu.listMenu;
  const { Converse } = list_menu.listMenu;
  return (
    <nav>
      <ul className="menu">
        <li style={{ "--i": "1" }}>
          <Link to="/" className="active" onClick={onClickCloseMenu}>
            trang chủ
					</Link>
        </li>
        <li
          className="active-menu"
          style={{ "--i": "2" }}
        >
          <a rel="noreferrer noopener">
            <div className="icon-menu">
              <img src={logoAdidas} alt="logoAdidas" />
            </div>
						Adidas
						<i className="fa fa-caret-down" />
          </a>
          <ul className="sub-menu">
            {Adidas &&
              Adidas.map((menu, key) => (
                <li key={key} >
                  <Link
                    to={`/product-type?nsx=${menu.replace(/ /g, "-")}`}
                    onClick={onClickCloseMenu}
                  >
                    {menu}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li
          className="active-menu"
          style={{ "--i": "3" }}
        >
          <a rel="noreferrer noopener">
            <div className="icon-menu">
              <img src={logoNike} alt="logoNike" />
            </div>
						Nike
						<i className="fa fa-caret-down" />
          </a>
          <ul className="sub-menu">
            {Nike &&
              Nike.map((menu, key) => (
                <li key={key} >
                  <Link
                    to={`/product-type?nsx=${menu.replace(/ /g, "-")}`}
                    onClick={onClickCloseMenu}
                  >
                    {menu}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li
          className="active-menu"
          style={{ "--i": "4" }}
        >
          <a rel="noreferrer noopener">
            <div className="icon-menu">
              <img src={logoVans} alt="logoVans" />
            </div>
						Vans <i className="fa fa-caret-down" />
          </a>
          <ul className="sub-menu">
            {Vans &&
              Vans.map((menu, key) => (
                <li key={key} >
                  <Link
                    to={`/product-type?nsx=${menu.replace(/ /g, "-")}`}
                    onClick={onClickCloseMenu}
                  >
                    {menu}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li
          className="active-menu"
          style={{ "--i": "5" }}
        >
          <a rel="noreferrer noopener">
            <div className="icon-menu">
              <img src={logoNewBanner} alt="logoNewBanner" />
            </div>
						new balance <i className="fa fa-caret-down" />
          </a>
          <ul className="sub-menu">
            {NewBalance &&
              NewBalance.map((menu, key) => (
                <li key={key} >
                  <Link
                    to={`/product-type?nsx=${menu.replace(/ /g, "-")}`}
                    onClick={onClickCloseMenu}
                  >
                    {menu}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li
          className="active-menu"
          style={{ "--i": "6" }}
        >
          <a rel="noreferrer noopener">
            <div className="icon-menu">
              <img src={logoPuma} alt="logoPuma" />
            </div>
						puma <i className="fa fa-caret-down" />
          </a>
          <ul className="sub-menu">
            {Puma &&
              Puma.map((menu, key) => (
                <li key={key} >
                  <Link
                    to={`/product-type?nsx=${menu.replace(/ /g, "-")}`}
                    onClick={onClickCloseMenu}
                  >
                    {menu}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
        <li
          className="active-menu"
          style={{ "--i": "7" }}
        >
          <a rel="noreferrer noopener">
            <div className="icon-menu">
              <img src={logoConverse} alt="logoConverse" />
            </div>
						converse <i className="fa fa-caret-down" />
          </a>
          <ul className="sub-menu">
            {Converse &&
              Converse.map((menu, key) => (
                <li key={key} >
                  <Link
                    to={`/product-type?nsx=${menu.replace(/ /g, "-")}`}
                    onClick={onClickCloseMenu}
                  >
                    {menu}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
