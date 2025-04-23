import { Link } from "lucide-react";
import { GlideSlide, GlideContainer } from './glide';

function PromoPB(props: any) {
    let content = props.content;
    if (content.data != null) content = content.data;
    let count = 0;
    let Icon1 = content.icon_column_1.split(",");
    let Icon2 = content.icon_column_2.split(",");
    let Icon3 = content.icon_column_3.split(",");
    let id = content.contentguid

    return (
        <div className={`${content.page_width}  ${content.add_margin_padding.margin_top_bottom_mobile} ${content.add_margin_padding.margin_top_bottom_desktop}  ${content.padding_left_right_mobile} ${content.padding_left_right_desktop} `} data-nqe-widget="nq-w-6" >
            <div className={`max-w-full ${content.bg_color}`}>

                <GlideContainer content={content.data} type={"promo"} id={id}>

                    {content.promo_text_column_1.value != "" ?
                        <GlideSlide key={count}>
                            <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_text_column_1.color} ${content.promo_text_column_1.font_weight} ${content.promo_text_column_1.font_style} ${content.promo_text_column_1.font_size}`}>
                                {Icon1.map((icon: any, index: any) => {
                                    count++;
                                    return (
                                        <i key={index} className={`${content.promo_text_column_1.color} ${icon}`}></i>
                                    );
                                })}
                                <div className="flex flex-col items-center">
                                    {content.url_column_1 != "" ? (
                                        <a href={content.url_column_1} className="text-center">
                                            <p className={`${content.promo_text_column_1.color} ${content.promo_text_column_1.font_weight} ${content.promo_text_column_1.font_style} ${content.promo_text_column_1.font_size}`}>
                                                {content.promo_text_column_1.value}
                                            </p>
                                            {content.promo_1_sub_text && content.promo_1_sub_text.value != "" ? (
                                                <p className={`text-xs ${content.promo_1_sub_text.color} ${content.promo_1_sub_text.font_weight} ${content.promo_1_sub_text.font_style} ${content.promo_1_sub_text.font_size}`}>
                                                    {content.promo_1_sub_text.value}
                                                </p>
                                            ) : null}
                                        </a>
                                    ) : (
                                        <div className="text-center">
                                            <p className={`${content.promo_text_column_1.color} ${content.promo_text_column_1.font_weight} ${content.promo_text_column_1.font_style} ${content.promo_text_column_1.font_size}`}>
                                                {content.promo_text_column_1.value}
                                            </p>
                                            {content.promo_1_sub_text && content.promo_1_sub_text.value != "" ? (
                                                <p className={`text-xs ${content.promo_1_sub_text.color} ${content.promo_1_sub_text.font_weight} ${content.promo_1_sub_text.font_style} ${content.promo_1_sub_text.font_size}`}>
                                                    {content.promo_1_sub_text.value}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlideSlide>
                        : null}

                    {content.promo_text_column_2.value != "" ?
                        <GlideSlide key={count}>
                            <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_text_column_2.color} ${content.promo_text_column_2.font_weight} ${content.promo_text_column_2.font_style} ${content.promo_text_column_2.font_size}`}>
                                {Icon2.map((icon: any, index: any) => {
                                    count++;
                                    return (
                                        <i key={index} className={`${content.promo_text_column_2.color} ${icon}`}></i>
                                    );
                                })}
                                <div className="flex flex-col items-center">
                                    {content.url_column_2 != "" ? (
                                        <a href={content.url_column_2} className="text-center">
                                            <p className={`${content.promo_text_column_2.color} ${content.promo_text_column_2.font_weight} ${content.promo_text_column_2.font_style} ${content.promo_text_column_2.font_size}`}>
                                                {content.promo_text_column_2.value}
                                            </p>
                                            {content.promo_2_sub_text && content.promo_2_sub_text.value != "" ? (
                                                <p className={`text-xs ${content.promo_2_sub_text.color} ${content.promo_2_sub_text.font_weight} ${content.promo_2_sub_text.font_style} ${content.promo_2_sub_text.font_size}`}>
                                                    {content.promo_2_sub_text.value}
                                                </p>
                                            ) : null}
                                        </a>
                                    ) : (
                                        <div className="text-center">
                                            <p className={`${content.promo_text_column_2.color} ${content.promo_text_column_2.font_weight} ${content.promo_text_column_2.font_style} ${content.promo_text_column_2.font_size}`}>
                                                {content.promo_text_column_2.value}
                                            </p>
                                            {content.promo_2_sub_text && content.promo_2_sub_text.value != "" ? (
                                                <p className={`text-xs ${content.promo_2_sub_text.color} ${content.promo_2_sub_text.font_weight} ${content.promo_2_sub_text.font_style} ${content.promo_2_sub_text.font_size}`}>
                                                    {content.promo_2_sub_text.value}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlideSlide>
                        : null}

                    {content.promo_text_column_3.value != "" ?
                        <GlideSlide key={count}>
                            <div className={`flex justify-center items-center p-[10px] gap-2 ${content.promo_text_column_3.color} ${content.promo_text_column_3.font_weight} ${content.promo_text_column_3.font_style} ${content.promo_text_column_3.font_size}`}>
                                {Icon3.map((icon: any, index: any) => {
                                    count++;
                                    return (
                                        <i key={index} className={`${content.promo_text_column_3.color} ${icon}`}></i>
                                    );
                                })}
                                <div className="flex flex-col items-center">
                                    {content.url_column_3 != "" ? (
                                        <a href={content.url_column_3} className="text-center">
                                            <p className={`${content.promo_text_column_3.color} ${content.promo_text_column_3.font_weight} ${content.promo_text_column_3.font_style} ${content.promo_text_column_3.font_size}`}>
                                                {content.promo_text_column_3.value}
                                            </p>
                                            {content.promo_3_sub_text && content.promo_3_sub_text.value != "" ? (
                                                <p className={`text-xs ${content.promo_3_sub_text.color} ${content.promo_3_sub_text.font_weight} ${content.promo_3_sub_text.font_style} ${content.promo_3_sub_text.font_size}`}>
                                                    {content.promo_3_sub_text.value}
                                                </p>
                                            ) : null}
                                        </a>
                                    ) : (
                                        <div className="text-center">
                                            <p className={`${content.promo_text_column_3.color} ${content.promo_text_column_3.font_weight} ${content.promo_text_column_3.font_style} ${content.promo_text_column_3.font_size}`}>
                                                {content.promo_text_column_3.value}
                                            </p>
                                            {content.promo_3_sub_text && content.promo_3_sub_text.value != "" ? (
                                                <p className={`text-xs ${content.promo_3_sub_text.color} ${content.promo_3_sub_text.font_weight} ${content.promo_3_sub_text.font_style} ${content.promo_3_sub_text.font_size}`}>
                                                    {content.promo_3_sub_text.value}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlideSlide>
                        : null}



                </GlideContainer>
            </div>
        </div>
    )
}

export default PromoPB;