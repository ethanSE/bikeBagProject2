import React, { useContext } from 'react';
import TopTube from '../assets/images/Toptube';
import Full from '../assets/images/Full';
import Front from '../assets/images/Front';
import { CustomSpecContext } from '../customSpecContext';
import cssStyle from '../styles/StyleSelection.module.css';

const StyleSelection = () => {
    const { style, setStyle } = useContext(CustomSpecContext)

    return (
        <div className={cssStyle.styleContainer}>
            <div className={style === 'topTube' ? cssStyle.styleItemActive : cssStyle.styleItem } onClick={() => setStyle('topTube')}>
                <h4>Top Tube</h4>
                <TopTube className={cssStyle.bagIcon} />
            </div>
            <div className={style === 'front' ? cssStyle.styleItemActive : cssStyle.styleItem} onClick={() => setStyle('front')}>
                <h4>Front</h4>
                <Front className={cssStyle.bagIcon} />
            </div>
            <div className={style === 'full' ? cssStyle.styleItemActive : cssStyle.styleItem} onClick={() => setStyle('full')}>
                <h4>Full</h4>
                <Full className={cssStyle.bagIcon} />
            </div>
        </div>
    )
}

export default StyleSelection;