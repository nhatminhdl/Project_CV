$(document).ready(function(){
    /*
    ======================================
                SET EDIT TEXT
    ======================================
    */
    
    $(`
        #person p,
        #persion-info p,
        #skills p,
        #favourite p,
        #presenter p,
        #more-info p,
        #career-target p,
        #experience p,
        #experience h6,
        #education p,
        #prize p,
        #certificate p,
        #activities p
        
    `).attr('contenteditable','true');

     /*
    ======================================
                    DELETE 
    ======================================
    */
    
    $(document).on('click',
    `
    .btn__Delete, 
    .btn__DeleteElement,
    .btn__Delete-1,
    .btn__Delete-2
    
    `,
    function(e){
        e.stopPropagation();
         $(this).parent().remove();
    });

    /*
    =======================================
                INSERT
    =======================================
    */

    $(document).on('mousedown', 
    `
    .btn__insert-line, 
    .btn__insert-line-1
    `,function(e){
        e.stopPropagation();
        let selector;
        let selectorCurrent;

        if (e.button === 2) {
            return;
        }

        if ($(this).parent().attr('id')) {
            selector = $(this).parent().attr('id');
            selectorCurrent = $(this).prev();

            console.log('id',selector,selectorCurrent);
        }else{
            selector = $(this).parent().attr('class');
            selectorCurrent =$(this).prev();
            console.log('class',selector,selectorCurrent);
        }
       
        insertItem(selector, selectorCurrent);
        
    })

    /*
    ==========================
            Load Avatar
    ==========================
    */
    
    $("#upload-image").change(function(e){
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("upload-image").files[0]);
        oFReader.onload = function (oFREvent) {
            document.getElementById("img").src = oFREvent.target.result;
        }
    })
 
    /*
    =========================
        Covert html to pdf
    =========================
    */
    $('#btn__export-pdf').click(function(){
        const contentPdf = $('.cv')[0];
        const day = new Date();
        
        const namePdf =
         `${day.getHours()}${day.getMinutes()}${day.getSeconds()}${day.getDate()}${(day.getMonth() + 1)}${day.getFullYear()}`;
        const options = {
            filename: namePdf,
            margin: [0,0,9,0],
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 },
            jsPDF: { 
                unit: 'mm', format: 'a4', orientation: 'portrait'
            },
            pagebreak: { mode: 'mode: avoid-all' }
        };
        html2pdf().set(options).from(contentPdf).save();
    })


    /*
    ========================================
            Handler insert item
    ========================================
    */
{

    function insertItem(selector,selectorCurrent){
        switch (selector) {
            case "skills":
                renderItem(selectorCurrent,itemSkill());
                break;
            case "favourite":
                renderItem(selectorCurrent,itemFavourite());
                break;
            case "presenter":
                renderItem(selectorCurrent,itemPresenter());
                break;
            case "presenter__item":
                renderItem(selectorCurrent,itemPresenterChild());
                break;
            case "more-info":
                renderItem(selectorCurrent,itemMoreInfo());
                break;
            case "career-target":
                renderItem(selectorCurrent,itemTargetCareer());
                break;
            case "experience":
                renderItem(selectorCurrent,itemExperience());
                break;
            case "experience__content":
                renderItem(selectorCurrent,itemExperienceChild());
                break;
            case "education":
                renderItem(selectorCurrent,itemEducation());
                break;
            case "education__item":
                renderItem(selectorCurrent,itemEducationChild());
                break;
            case "prize":
                renderItem(selectorCurrent,itemPrize());
                break;
            case "certificate":
                renderItem(selectorCurrent,itemCertificate());
                break;
            case "activities":
                renderItem(selectorCurrent, itemActivities());
                break;
            default:
                break;
        }
    }

    function renderItem(selector, str){
        selector.append(str);
    }

    function itemSkill(){
        const str = `
        <li class="skills__item">
            <p class="text__edit" placeholder="Nhập tên kỹ năng" contenteditable></p>
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        `;

        return str;
    }

    function itemFavourite(){
        const str = `
        <li class="favourites__item">
            <p class="text__edit" contenteditable placeholder="Nhập các sở thích của bạn."></p>
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        
        `;

        return str;
    }

    function itemPresenter(){
        const str = `
        <li class="presenter__item">
            <div class="presenter__item-info">
                <div class="presenter__item-text">
                    <p contenteditable placeholder="Nhập thông tin người tham chiếu"></p>
                    <button  class="btn__DeleteElement">
                        <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                    </button>
                </div>
            </div>

            <div class="btn__insert-line-1">
                <button title="Thêm dòng" class="btn__insert">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <button class="btn__Delete-1">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        `;

        return str;
    }

    function itemPresenterChild(){
        const str = `
        <div class="presenter__item-text">
            <p contenteditable placeholder="Nhập thông tin người tham chiếu"></p>
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </div>
        
        `;
        return str;
    }

    function itemMoreInfo(){
        const str = `
        <li class="more-info__item">
            <p contenteditable placeholder="(Điền các thông tin khác nếu có)"></p>
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        `;
        return str;
    }

    function itemTargetCareer(){
        const str = `
        <div class="target__content">
            <p contenteditable placeholder="Nhập mục tiêu nghề nghiệp, bao gồm mục tiêu ngắn hạn và dài hạn"></p>
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </div>
        `;
        return str;
    }

    function itemExperience(){
        const str = `
        <div class="experience__content">
            <div class="ex-content__header">
                <h6 contenteditable class="content-header__title" placeholder="Vị trí công việc"></h6>
                <h6 contenteditable class="content-header-time" placeholder="Bắt đầu - Kết thúc"></h6>
            </div>

            <div class="ex-content__company">
                <p contenteditable placeholder="Nhập tên công ty" ></p>
                <button class="btn__DeleteElement">
                    <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                </button>
            </div>

            <ul class="ex-content__list">
                <li class="ex-content__item">
                    <p contenteditable placeholder="Nhập mô tả kinh nghiệm làm việc"></p>

                    <button class="btn__DeleteElement">
                        <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                    </button>
                </li>
            </ul>

            <div class="btn__insert-line-1">
                <button title="Thêm dòng" class="btn__insert btn__insert--right">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <div class="btn__Delete-1">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </div>
      
        </div>
        
        `;

        return str;
    }

    function itemExperienceChild(){
        const str = `
        <li class="ex-content__item">
            <p contenteditable placeholder="Nhập mô tả kinh nghiệm làm việc"></p>

            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        `;

        return str;
    }

    function itemEducation(){
        const str = `
        <li class="education__item">
            <div class="education__item-header">
                <div class="education__item-majors"><p contenteditable placeholder="Nhập ngành học/môn học"></p></div>
                <div class="education__item-time"><p contenteditable placeholder="Bắt đầu - Kết thúc"></p></div>
            </div>

            <div class="education__item-content">
                <div class="education__school-name">
                    <p contenteditable placeholder="Nhập tên trường học"></p>
                    <button class="btn__Delete-2">
                        <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                    </button>
                </div>
                
                <div class="education__description">
                    <p contenteditable placeholder="Nhập mô tả quá trình học tập hoặc thành tích"></p>
                    <button class="btn__Delete-2">
                        <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                    </button>
                </div>

                <button class="btn__Delete-1">
                    <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                </button>
            </div>

            <div class="btn__insert-line-1">
                <button title="Thêm dòng" class="btn__insert btn__insert--right">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>

        </li>
        
        `;

        return str;
    }

    function itemEducationChild(){
        const str = `
        <div class="education__item-content">
            <div class="education__school-name">
                <p contenteditable placeholder="Nhập tên trường học"></p>
                <button class="btn__Delete-2">
                    <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                </button>
            </div>
            
            <div class="education__description">
                <p contenteditable placeholder="Nhập mô tả quá trình học tập hoặc thành tích"></p>
                <button class="btn__Delete-2">
                    <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                </button>
            </div>

            <button class="btn__Delete-1">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </div>
        `;

        return str;
    }

    function itemPrize(){
        const str = ` 
        <li class="prize__item">
            <div class="prize__item-content">
                <div class="prize__content-year">
                    <p contenteditable placeholder="Năm"></p>
                    <button class="btn__Delete-1">
                        <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                    </button>
                </div>
                <div class="prize__content-name">
                    <p contenteditable placeholder="Tên giải thưởng"></p>
                </div>
            </div>
        
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        `;
        return str;
    }

    function itemCertificate(){
        const str = `
        <li class="certificate__item">
            <div class="certificate__item-content">
                <div class="certificate__content-year">
                    <p contenteditable placeholder="Năm"></p>
                    <button class="btn__Delete-1">
                        <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                    </button>
                </div>
                <div class="certificate__content-name">
                    <p contenteditable placeholder="Tên chứng chỉ"></p>
                </div>
            </div>
       
            <button class="btn__DeleteElement">
                <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        
        `;

        return str;
    }

    function itemActivities(){
        const str = ` 
        <li class="activities-content__item">
            <div class="activities__header">
                <div class="activities-header__name"><p contenteditable placeholder="Vị trí của bạn"></p></div>
                <div class="activities-header__time"><p contenteditable placeholder="Bắt đầu - Kết thúc"></p></div>
            </div>
            <div class="activities-content__name">
                <p contenteditable placeholder="Nhập tên tổ chức"></p>
            </div>
        
            <div class="activities-content__desc">
                <p contenteditable placeholder="Nhập mô tả hoạt động"></p>
                <button class="btn__Delete-1">
                    <i class="fa-solid fa-xmark btn__Delete__icon"></i>
                </button>
            </div>

             
            <button class="btn__DeleteElement">
            <i class="fa-solid fa-xmark btn__Delete__icon"></i>
            </button>
        </li>
        
        `;

        return str;
    }
}

    /*==============================================================================================*/



});


