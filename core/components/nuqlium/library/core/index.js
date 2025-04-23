import React from "react";

 const Components = {
    "markups/container":React.lazy(()=>import('../markups/container')),
    "markups/hero":React.lazy(()=>import('../markups/banner')),
    "markups/media":React.lazy(()=>import('../markups/media')),
    "markups/button":React.lazy(()=>import('../markups/button')),
    "markups/margin_spacer":React.lazy(()=>import('../markups/spacer')),
    "markups/content_block":React.lazy(()=>import('../markups/content-block')),
    "markups/splitblock":React.lazy(()=>import('../markups/splitblock')),
    "markups/collage":React.lazy(()=>import('../markups/collage')),
    "markups/tabbed_feed_rec_container":React.lazy(()=>import('../markups/tabbed-container')),
    "markups/testimonial":React.lazy(()=>import('../markups/testimonial')),
    "markups/mega_menu_container":React.lazy(()=>import('../markups/mega-menu')),
    "markups/content_body":React.lazy(()=>import('../markups/content-body')),
    "markups/product_scroller":React.lazy(()=>import('../markups/product-scroller')),
    "markups/countdown_timer":React.lazy(()=>import('../markups/countdown-timer')),
    "markups/slider":React.lazy(()=>import('../markups/slider')),
    "markups/currency_switcher":React.lazy(()=>import('../markups/currency-switcher')),
    "markups/hotspots":React.lazy(()=>import('../markups/hotspots')),
    "markups/glide":React.lazy(()=>import('../markups/glide')),
    "markups/footer_container":React.lazy(()=>import('../markups/footer')),
    "markups/promo":React.lazy(()=>import('../markups/promo')),
    "markups/newsletter_popup":React.lazy(()=>import('../markups/newsletter-popup')),
    "markups/spin_to_win_behavioral_popups":React.lazy(()=>import('../markups/spin-to-win-behavioral-popups')),
    "markups/popup_exit_intent":React.lazy(()=>import('../markups/popup-exit-intent')),

    "markups/promotion_bar_content_library_dp":React.lazy(()=>import('../markups/promo-dp-pb')),
    "markups/promotion_bar_dp":React.lazy(()=>import('../markups/promo-dp')),
    "markups/collage_content_library":React.lazy(()=>import('../markups/collage-pb')),
    "markups/container_content_library":React.lazy(()=>import('../markups/container-pb')),
    "markups/content_block_content_library":React.lazy(()=>import('../markups/content-block-pb')),
    "markups/content_body_content_library":React.lazy(()=>import('../markups/content-body-pb')),
    "markups/countdown_timer_content_library":React.lazy(()=>import('../markups/countdown-timer-pb')),
    "markups/banner_content_library":React.lazy(()=>import('../markups/banner-pb')),
    "markups/media_content_library":React.lazy(()=>import('../markups/media-pb')),
    "markups/split_block_content_library":React.lazy(()=>import('../markups/splitblock-pb')),
    "markups/testimonial_content_library":React.lazy(()=>import('../markups/testimonial-pb')),
    "markups/tabbed_container_content_library":React.lazy(()=>import('../markups/tabbed-container-pb')),
    "markups/promotion_bar_content_library":React.lazy(()=>import('../markups/promo-pb')),
    "markups/product_scroller_content_library":React.lazy(()=>import('../markups/product-scroller-pb')),
    "markups/button_content_library":React.lazy(()=>import('../markups/button-pb')),
















    "popups":React.lazy(()=>import('../templates/popups')),
    "category":React.lazy(()=>import('../templates/category')),
    "categoryfeed":React.lazy(()=>import('../templates/categoryFeed')),
    "flow":React.lazy(()=>import('../templates/flow')),
    "search":React.lazy(()=>import('../templates/search')),
    "zone":React.lazy(()=>import('../templates/zone')),
    "feed":React.lazy(()=>import('../templates/feed')),
    "recommendations":React.lazy(()=>import('../templates/recommendations')),
    "block":React.lazy(()=>import('../templates/block')),
    "content":React.lazy(()=>import('../partials/content')),
    "pages":React.lazy(()=>import('../templates/pages')),
    "predictive":React.lazy(()=>import('../templates/predictive')),

}

 export default Components;