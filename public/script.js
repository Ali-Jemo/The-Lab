document.addEventListener('DOMContentLoaded', function() {

    // إضافة تأثير ظهور تدريجي للعناصر عند التمرير
    const fadeElements = document.querySelectorAll('.business-block, .investor-card, .timeline-item, .contact-form-container, .contact-info');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-element');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeInObserver.observe(element);
    });

    // تحريك العناصر في الخلفية عند تحريك الماوس
    const movingBackground = document.querySelector('.moving-background');
    if (movingBackground) {
        document.addEventListener('mousemove', function(e) {
            const shapes = document.querySelectorAll('.shape');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const speed = 0.03 * (index + 1);
                const offsetX = (x - 0.5) * speed * 100;
                const offsetY = (y - 0.5) * speed * 100;
                
                shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }

    // تمرير سلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تأثير تثبيت الهيدر عند التمرير
    const header = document.querySelector('.sticky-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // تفعيل نموذج التواصل
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // إظهار رسالة نجاح
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon">✓</div>
                <h3>تم إرسال رسالتك بنجاح!</h3>
                <p>سنقوم بالرد عليك في أقرب وقت ممكن.</p>
            `;
            
            // استبدال النموذج برسالة النجاح
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.parentNode.appendChild(successMessage);
                contactForm.style.display = 'none';
                
                // إعادة النموذج بعد 5 ثوان
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                        contactForm.style.display = 'block';
                        setTimeout(() => {
                            contactForm.style.opacity = '1';
                            contactForm.reset();
                        }, 300);
                    }, 500);
                }, 5000);
            }, 300);
        });
    }

    // إضافة تأثير عند التحويم على بطاقات المستثمرين
    const investorCards = document.querySelectorAll('.investor-card');
    investorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.investor-icon').style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.investor-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // إضافة عداد تصاعدي للأرقام
    const countElements = document.querySelectorAll('.highlight');
    
    const startCounting = (element) => {
        const target = parseInt(element.textContent);
        const suffix = element.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const step = target / duration * 10;
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 10);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    countElements.forEach(el => {
        counterObserver.observe(el);
    });

    // تأثير متحرك للجدول الزمني
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        timelineObserver.observe(item);
    });

    // تأثير متحرك للرسوم البيانية
    const chartContainers = document.querySelectorAll('canvas');
    chartContainers.forEach(chart => {
        chart.style.opacity = '0';
        chart.style.transform = 'scale(0.9)';
        chart.style.transition = 'all 1s ease';
        
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 300);
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        chartObserver.observe(chart);
    });

    // تفاعلية قسم خطة العمل المتكاملة
    initializeBusinessPlanInteractivity();

    // إضافة تأثير نبض للأزرار عند التحويم
    const buttons = document.querySelectorAll('.btn:not(.pulse-btn)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
    });

    // إضافة CSS لتأثير الأزرار
    const style = document.createElement('style');
    style.textContent = `
        .btn-hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .fade-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in-element {
            opacity: 1;
            transform: translateY(0);
        }
        
        .header-scrolled {
            background-color: rgba(15, 15, 15, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            padding: 10px 0;
        }
        
        .header-hidden {
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .success-message {
            background-color: #222;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            transition: opacity 0.5s ease;
        }
        
        .success-icon {
            width: 60px;
            height: 60px;
            background-color: #4ECDC4;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 30px;
            color: #111;
            animation: pulse 2s infinite;
        }
        
        /* تحسينات إضافية للتفاعلية */
        .interactive-block {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .action-btn {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .filter-btn {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .search-box {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .metric-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .vision-card, .mission-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hidden-details {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .interactive-chart {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);

    // إضافة تأثير تحرك الأيقونات في التذييل
    const footerIcons = document.querySelectorAll('.social-icons a');
    footerIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // إضافة تأثير تحريك للعنوان الرئيسي
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 500) {
                const translateY = scrollPosition * 0.2;
                const scale = 1 - (scrollPosition * 0.0005);
                mainTitle.style.transform = `translateY(${translateY}px) scale(${scale})`;
            }
        });
    }

    // --- حاسبة العائد المتقدمة ---
    const calcForm = document.getElementById('calc-form');
    const calcResult = document.getElementById('calc-result');
    const calcChart = document.getElementById('calcChart');
    const compareResult = document.getElementById('compare-result');
    const saveBtn = document.getElementById('save-scenario');
    const compareBtn = document.getElementById('compare-scenario');
    const printBtn = document.getElementById('print-result');
    const calcSummary = document.getElementById('calc-summary');

    let savedScenario = null;
    let chartInstance = null;
    const USD_RATE = 1300; // سعر صرف تقريبي

    function formatCurrency(val, currency) {
        if (currency === 'usd') {
            return `$${(val / USD_RATE).toLocaleString(undefined, {maximumFractionDigits: 2})}`;
        } else {
            return `${val.toLocaleString()} د.ع`;
        }
    }

    function calculateReturn(amount, years, currency, extraCost = 0) {
        let total = amount;
        let details = [];
        let capitalRecovered = false;
        let yearCapitalRecovered = null;
        let invested = amount;
        for (let i = 1; i <= years; i++) {
            total = (total * 1.35) - extraCost;
            details.push({year: i, value: total});
            if (!capitalRecovered && total > invested) {
                capitalRecovered = true;
                yearCapitalRecovered = i;
            }
        }
        return {details, yearCapitalRecovered, total};
    }

    function showResult(amount, years, currency, extraCost = 0) {
        const {details, yearCapitalRecovered, total} = calculateReturn(amount, years, currency, extraCost);
        let html = `العائد الكلي بعد ${years} سنة: <b>${formatCurrency(total, currency)}</b><br><b>تفاصيل العائد:</b><br>`;
        details.forEach(d => {
            html += `سنة ${d.year}: ${formatCurrency(d.value, currency)}<br>`;
        });
        calcResult.innerHTML = html;
        calcResult.style.display = 'block';
        // رسم بياني
        drawChart(details, currency, amount, extraCost);
        // ملخص ذكي
        let summary = '';
        if (yearCapitalRecovered) {
            summary += `✅ سيتم استرداد رأس المال خلال <b>سنة ${yearCapitalRecovered}</b>.<br>`;
        } else {
            summary += `⚠️ لم يتم استرداد رأس المال خلال الفترة المحددة.<br>`;
        }
        // مقارنة مع مشروع تقليدي (عائد 25%)
        let traditional = amount;
        let traditionalDetails = [];
        for (let i = 1; i <= years; i++) {
            traditional = (traditional * 1.25) - extraCost;
            traditionalDetails.push(currency === 'usd' ? traditional/USD_RATE : traditional);
        }
        summary += `لو استثمرت نفس المبلغ في مشروع تقليدي (عائد 25%) سيكون العائد بعد ${years} سنة: <b>${formatCurrency(traditional, currency)}</b>.<br>`;
        if (total > traditional) {
            summary += `🔹 مشروع The Lab يحقق عائداً أعلى بنسبة <b>${Math.round(((total-traditional)/traditional)*100)}%</b> مقارنة بالمشاريع التقليدية.`;
        } else {
            summary += `🔸 العائد قريب من المشاريع التقليدية، لكن مع تجربة أكثر تميزاً.`;
        }
        calcSummary.innerHTML = summary;
        calcSummary.style.display = 'block';
    }

    function drawChart(details, currency, amount, extraCost) {
        if (!calcChart) return;
        calcChart.style.display = 'block';
        const ctx = calcChart.getContext('2d');
        if (chartInstance) chartInstance.destroy();
        // بيانات المشروع التقليدي
        let traditional = amount;
        let traditionalData = [];
        for (let i = 1; i <= details.length; i++) {
            traditional = (traditional * 1.25) - extraCost;
            traditionalData.push(currency === 'usd' ? traditional/USD_RATE : traditional);
        }
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: details.map(d => `سنة ${d.year}`),
                datasets: [
                    {
                        label: 'عائد The Lab',
                        data: details.map(d => currency === 'usd' ? d.value/USD_RATE : d.value),
                        backgroundColor: 'rgba(78,205,196,0.15)',
                        borderColor: '#4ECDC4',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'مشروع تقليدي (25%)',
                        data: traditionalData,
                        backgroundColor: 'rgba(255,217,61,0.10)',
                        borderColor: '#FFD93D',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                plugins: {legend: {labels: {color: '#fff'}}},
                scales: {
                    y: {ticks: {color: '#fff'}},
                    x: {ticks: {color: '#fff'}}
                }
            }
        });
    }

    if (calcForm) {
        calcForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = parseInt(document.getElementById('amount').value);
            const years = parseInt(document.getElementById('years').value);
            const currency = document.getElementById('currency').value;
            const extraCost = parseInt(document.getElementById('extra-cost').value) || 0;
            showResult(amount, years, currency, extraCost);
        });
    }

    // حفظ السيناريو
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const amount = parseInt(document.getElementById('amount').value);
            const years = parseInt(document.getElementById('years').value);
            const currency = document.getElementById('currency').value;
            savedScenario = {amount, years, currency};
            localStorage.setItem('thelab_scenario', JSON.stringify(savedScenario));
            alert('تم حفظ السيناريو!');
        });
    }

    // مقارنة سيناريوهين
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            const amount = parseInt(document.getElementById('amount').value);
            const years = parseInt(document.getElementById('years').value);
            const currency = document.getElementById('currency').value;
            let old = localStorage.getItem('thelab_scenario');
            if (!old) {
                alert('يرجى حفظ سيناريو أولاً للمقارنة.');
                return;
            }
            old = JSON.parse(old);
            const details1 = calculateReturn(old.amount, old.years, old.currency);
            const details2 = calculateReturn(amount, years, currency);
            let html = `<b>المقارنة بين سيناريو محفوظ وسيناريو حالي:</b><br>`;
            html += `<u>السيناريو المحفوظ:</u> ${formatCurrency(old.amount, old.currency)} لمدة ${old.years} سنة → <b>${formatCurrency(details1[details1.length-1].value, old.currency)}</b><br>`;
            html += `<u>السيناريو الحالي:</u> ${formatCurrency(amount, currency)} لمدة ${years} سنة → <b>${formatCurrency(details2[details2.length-1].value, currency)}</b><br>`;
            compareResult.innerHTML = html;
            compareResult.style.display = 'block';
        });
    }

    // طباعة/حفظ PDF
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            const printContent = calcResult.innerHTML;
            const win = window.open('', '', 'width=700,height=600');
            win.document.write('<html><head><title>نتيجة حاسبة العائد</title><style>body{font-family:Tajawal,sans-serif;direction:rtl;padding:30px;}b{color:#4ECDC4;} u{color:#FFD93D;}</style></head><body>');
            win.document.write('<h2>نتيجة حاسبة العائد الاستثماري</h2>');
            win.document.write(printContent);
            win.document.write('</body></html>');
            win.document.close();
            win.print();
        });
    }

    // تفعيل الأسئلة الشائعة
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('open');
            // إغلاق باقي العناصر
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('open');
            });
        });
    });

    // رسم بياني لمؤشرات الأداء الرئيسية
    const kpiChartEl = document.getElementById('kpiChart');
    if (kpiChartEl) {
        new Chart(kpiChartEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['2025', '2026', '2027'],
                datasets: [
                    {
                        label: 'عدد العملاء المتوقع',
                        data: [1200, 1800, 2500],
                        backgroundColor: '#FFD93D',
                        yAxisID: 'y',
                    },
                    {
                        label: 'معدل النمو السنوي (%)',
                        data: [35, 32, 28],
                        backgroundColor: '#4ECDC4',
                        yAxisID: 'y1',
                    },
                    {
                        label: 'معدل الاحتفاظ بالعملاء (%)',
                        data: [70, 75, 80],
                        backgroundColor: '#FF6B6B',
                        yAxisID: 'y1',
                    },
                    {
                        label: 'متوسط الإنفاق الشهري (ألف د.ع)',
                        data: [85, 92, 100],
                        backgroundColor: '#6A67CE',
                        yAxisID: 'y2',
                    },
                    {
                        label: 'عدد الفعاليات السنوية',
                        data: [12, 18, 24],
                        backgroundColor: '#34495E',
                        yAxisID: 'y3',
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top', labels: { color: '#fff', font: { size: 13 } } },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                        title: { display: true, text: 'عدد العملاء', color: '#FFD93D' },
                        ticks: { color: '#FFD93D' }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        title: { display: true, text: 'النسبة (%)', color: '#4ECDC4' },
                        ticks: { color: '#4ECDC4' }
                    },
                    y2: {
                        beginAtZero: true,
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        title: { display: true, text: 'ألف د.ع', color: '#6A67CE' },
                        ticks: { color: '#6A67CE' }
                    },
                    y3: {
                        beginAtZero: true,
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        title: { display: true, text: 'عدد الفعاليات', color: '#34495E' },
                        ticks: { color: '#34495E' }
                    },
                    x: {
                        ticks: { color: '#fff' }
                    }
                }
            }
        });
    }

    // عداد متحرك لمؤشرات الأداء الرئيسية
    function animateKPIs() {
      document.querySelectorAll('.kpi-value').forEach(el => {
        let target = Number(el.dataset.value);
        if (isNaN(target) || target <= 0) {
          el.textContent = el.dataset.value || '0';
          return;
        }
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const format = (n) => n.toLocaleString('ar-EG');
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = format(target);
            clearInterval(interval);
          } else {
            el.textContent = format(count);
          }
        }, 30);
      });
    }

    // تشغيل العداد عند ظهور القسم في الشاشة
    function onKPISectionVisible() {
      const section = document.getElementById('kpi-section');
      if (!section) return;
      let animated = false;
      function checkVisibility() {
        const rect = section.getBoundingClientRect();
        if (!animated && rect.top < window.innerHeight && rect.bottom > 0) {
          animateKPIs();
          animated = true;
          window.removeEventListener('scroll', checkVisibility);
        }
      }
      window.addEventListener('scroll', checkVisibility);
      checkVisibility();
    }

    onKPISectionVisible();

    // دالة إظهار تفاصيل الاستثمار
    function showInvestmentDetails() {
        const content = `
            <div class="investment-details">
                <h3>تفاصيل الاستثمار في The Lab</h3>
                <div class="investment-grid">
                    <div class="investment-item">
                        <h4>💰 رأس المال المطلوب</h4>
                        <p class="amount">50,000,000 د.ع</p>
                        <p class="description">إجمالي رأس المال المطلوب للمشروع</p>
                    </div>
                    <div class="investment-item">
                        <h4>📊 العائد المتوقع</h4>
                        <p class="amount">35% سنوياً</p>
                        <p class="description">معدل العائد السنوي على الاستثمار</p>
                    </div>
                    <div class="investment-item">
                        <h4>⏱️ فترة الاسترداد</h4>
                        <p class="amount">24 شهر</p>
                        <p class="description">الوقت المطلوب لاسترداد رأس المال</p>
                    </div>
                    <div class="investment-item">
                        <h4>📈 معدل النمو</h4>
                        <p class="amount">20-30% سنوياً</p>
                        <p class="description">معدل النمو السنوي المتوقع</p>
                    </div>
                </div>
                
                <div class="cost-breakdown">
                    <h4>تفصيل التكاليف:</h4>
                    <div class="cost-item">
                        <span>تكاليف التأسيس</span>
                        <span>15,000,000 د.ع (30%)</span>
                    </div>
                    <div class="cost-item">
                        <span>المعدات والتجهيزات</span>
                        <span>20,000,000 د.ع (40%)</span>
                    </div>
                    <div class="cost-item">
                        <span>رأس مال تشغيلي</span>
                        <span>10,000,000 د.ع (20%)</span>
                    </div>
                    <div class="cost-item">
                        <span>تسويق وإطلاق</span>
                        <span>5,000,000 د.ع (10%)</span>
                    </div>
                </div>
                
                <div class="investment-benefits">
                    <h4>مزايا الاستثمار:</h4>
                    <ul>
                        <li>✅ سوق مستهدف واضح (الشباب والطلاب)</li>
                        <li>✅ نموذج عمل مبتكر يجمع بين المتجر والمطبخ</li>
                        <li>✅ إمكانية التوسع والتكرار</li>
                        <li>✅ عائد استثماري جذاب</li>
                        <li>✅ فريق إدارة محترف</li>
                    </ul>
                </div>
            </div>
        `;
        showAdvancedModal('تفاصيل الاستثمار', content);
        // مرر المستخدم إلى قسم المستثمرين
        const investorSection = document.getElementById('investor');
        if (investorSection) {
            investorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // دالة إظهار نافذة التواصل
    function showContactModal() {
        const content = `
            <div class="contact-modal">
                <h3>تواصل معنا للاستثمار</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        <span class="icon">📍</span>
                        <span>الموقع: العراق - كربلاء</span>
                    </div>
                    <div class="contact-item">
                        <span class="icon">📱</span>
                        <span>التواصل: تليجرام</span>
                    </div>
                    <div class="contact-item">
                        <span class="icon">📧</span>
                        <span>البريد الإلكتروني: info@thelab.com</span>
                    </div>
                </div>
                
                <div class="contact-form">
                    <h4>أرسل لنا رسالة:</h4>
                    <form id="contact-form">
                        <input type="text" placeholder="الاسم الكامل" required>
                        <input type="email" placeholder="البريد الإلكتروني" required>
                        <input type="tel" placeholder="رقم الهاتف" required>
                        <textarea placeholder="رسالتك أو استفسارك" rows="4" required></textarea>
                        <button type="submit" class="btn-advanced">إرسال الرسالة</button>
                    </form>
                </div>
            </div>
        `;
        const modalId = showAdvancedModal('تواصل معنا', content);
        // مرر المستخدم إلى قسم التواصل
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', handleContactForm);
            }
        }, 100);
    }

    // دالة معالجة نموذج التواصل
    function handleContactForm(e) {
        e.preventDefault();
        
        // محاكاة إرسال النموذج
        loadingSystem.show();
        
        setTimeout(() => {
            loadingSystem.hide();
            notificationSystem.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            
            // إغلاق النافذة المنبثقة
            const modal = document.querySelector('.modal-advanced.active');
            if (modal) {
                modalSystem.close(modal.id);
            }
        }, 2000);
    }

    // دالة تهيئة أنظمة التصنيف والتقدم
    function initializeRatingAndProgress() {
        // تهيئة نظام التصنيف للاستثمار
        const investmentRating = document.getElementById('investment-rating');
        if (investmentRating) {
            showRatingSystem(investmentRating, {
                maxRating: 5,
                currentRating: 4,
                onRatingChange: (rating) => {
                    notificationSystem.info(`تم تقييم الاستثمار بـ ${rating} نجوم`);
                }
            });
        }
        
        // تهيئة نظام التصنيف لدورة رأس المال
        const cycleRating = document.getElementById('cycle-rating');
        if (cycleRating) {
            showRatingSystem(cycleRating, {
                maxRating: 5,
                currentRating: 5,
                onRatingChange: (rating) => {
                    notificationSystem.info(`تم تقييم دورة رأس المال بـ ${rating} نجوم`);
                }
            });
        }
        
        // تهيئة نظام التقدم للنمو
        const growthProgress = document.getElementById('growth-progress');
        if (growthProgress) {
            const progressSystem = showProgressSystem(growthProgress, {
                value: 0,
                max: 100,
                animated: true
            });
            
            // تحريك شريط التقدم
            setTimeout(() => {
                progressSystem.animate(0, 75, 2000);
            }, 500);
        }
    }

    // دالة تحسين الرسوم البيانية مع الميزات المتقدمة
    function enhanceChartWithAdvancedFeatures(chartId) {
        const chartElement = document.getElementById(chartId);
        if (!chartElement) return;
        
        // إضافة تأثيرات متقدمة للرسم البياني
        chartElement.classList.add('card-3d');
        
        // إضافة مؤشر تحميل
        loadingSystem.show();
        
        // إنشاء الرسم البياني
        createChartWithRetry(chartId)
            .then(() => {
                loadingSystem.hide();
                
                // إطلاق حدث نجاح تحميل الرسم البياني
                document.dispatchEvent(new CustomEvent('chartLoaded', {
                    detail: { chartId }
                }));
            })
            .catch((error) => {
                loadingSystem.hide();
                
                // إطلاق حدث خطأ تحميل الرسم البياني
                document.dispatchEvent(new CustomEvent('chartError', {
                    detail: { chartId, error }
                }));
            });
    }

    // دالة تحديث دالة showChart لاستخدام الميزات المتقدمة
    function showChartAdvanced(chartId) {
        const chart = document.getElementById(chartId);
        const block = chart.closest('.interactive-block');
        const button = block.querySelector('.action-btn[data-action="chart"]');
        
        if (!chart) {
            console.error('Chart element not found:', chartId);
            return;
        }
        
        if (chart.style.display === 'none') {
            // إظهار الرسم البياني
            chart.style.display = 'block';
            button.textContent = 'إخفاء الرسم البياني';
            
            // إضافة تأثير ظهور للرسم البياني
            chart.style.opacity = '0';
            chart.style.transform = 'scale(0.9)';
            
            // إضافة فئة التحميل
            chart.classList.add('loading');
            
            // استخدام الميزات المتقدمة
            enhanceChartWithAdvancedFeatures(chartId);
            
            // تأثير ظهور تدريجي
            setTimeout(() => {
                chart.style.opacity = '1';
                chart.style.transform = 'scale(1)';
            }, 100);
        } else {
            // إخفاء الرسم البياني
            chart.style.opacity = '0';
            chart.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                chart.style.display = 'none';
                button.textContent = 'رسم بياني';
                
                // إزالة الرسوم البيانية من الذاكرة
                if (window.charts && window.charts[chartId]) {
                    window.charts[chartId].destroy();
                    delete window.charts[chartId];
                }
                
                // إزالة رسائل الخطأ
                const errorMessages = chart.parentNode.querySelectorAll('div[style*="color: #FF6B6B"]');
                errorMessages.forEach(msg => msg.remove());
                
                // إزالة فئات الحالة
                chart.classList.remove('loading', 'error');
            }, 300);
        }
    }

    // تهيئة الميزات المتقدمة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        // تهيئة الميزات المتقدمة بعد فترة قصيرة
        setTimeout(initializeAdvancedFeatures, 1000);
        
        // إضافة تأثيرات للعناصر الموجودة
        setTimeout(addAdvancedEffects, 2000);
        
        // تهيئة أنظمة التصنيف والتقدم
        setTimeout(initializeRatingAndProgress, 3000);
        
        // استبدال دالة showChart بالنسخة المتقدمة
        setTimeout(() => {
            // تحديث مستمعي الأحداث للأزرار
            const chartButtons = document.querySelectorAll('.action-btn[data-action="chart"]');
            chartButtons.forEach(button => {
                button.onclick = function() {
                    const chartId = this.getAttribute('data-chart-id');
                    if (chartId) {
                        showChartAdvanced(chartId);
                    }
                };
            });
        }, 1000);
    });

});

// دالة تفعيل التفاعلية في قسم خطة العمل
function initializeBusinessPlanInteractivity() {
    
    // البحث في خطة العمل
    const searchInput = document.getElementById('business-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // إضافة مراقب للتغييرات في حقل البحث
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                // إعادة تعيين جميع الكتل عند إفراغ البحث
                resetSearchHighlight();
            }
        });
    }
    
    // أزرار التصفية
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterBlocks(filter);
            
            // إزالة الفئة النشطة من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
        });
    });
    
    // أزرار التفاصيل والرسوم البيانية
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            
            if (action === 'details') {
                toggleDetails(this);
            } else if (action === 'chart') {
                const chartId = this.getAttribute('data-chart-id');
                if (chartId) {
                    showChart(chartId);
                } else {
                    console.error('Chart ID not found for button:', this);
                }
            }
        });
    });
    
    // تفاعلية عناصر الميزات
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('feature-active');
        });
    });
    
    // تحريك أشرطة التكاليف
    animateCostBars();
    
    // إضافة تأثيرات إضافية
    addInteractiveEffects();
    
    console.log('Business plan interactivity initialized successfully');
}

// دالة إعادة تعيين تمييز البحث
function resetSearchHighlight() {
    const blocks = document.querySelectorAll('.interactive-block');
    blocks.forEach(block => {
        block.style.borderColor = '';
        block.style.boxShadow = '';
        block.style.display = 'block';
        block.style.opacity = '1';
    });
}

// دالة البحث
function performSearch() {
    const searchTerm = document.getElementById('business-search').value.toLowerCase();
    const blocks = document.querySelectorAll('.interactive-block');
    
    if (searchTerm === '') {
        resetSearchHighlight();
        return;
    }
    
    blocks.forEach(block => {
        const content = block.textContent.toLowerCase();
        const title = block.querySelector('h3').textContent.toLowerCase();
        
        if (content.includes(searchTerm) || title.includes(searchTerm)) {
            block.style.display = 'block';
            block.style.opacity = '1';
            // إضافة تأثير تمييز
            block.style.borderColor = '#4ECDC4';
            block.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.3)';
        } else {
            block.style.display = 'none';
        }
    });
    
    // إعادة تعيين التصفية
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
}

// دالة تصفية الكتل
function filterBlocks(filter) {
    const blocks = document.querySelectorAll('.interactive-block');
    
    blocks.forEach(block => {
        const category = block.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            block.style.display = 'block';
            setTimeout(() => {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }, 100);
        } else {
            block.style.opacity = '0';
            block.style.transform = 'translateY(20px)';
            setTimeout(() => {
                block.style.display = 'none';
            }, 300);
        }
    });
    
    // إعادة تعيين البحث عند تغيير التصفية
    const searchInput = document.getElementById('business-search');
    if (searchInput) {
        searchInput.value = '';
        resetSearchHighlight();
    }
}

// دالة تبديل التفاصيل
function toggleDetails(button) {
    const block = button.closest('.interactive-block');
    const details = block.querySelector('.hidden-details');
    const isVisible = details.style.display !== 'none';
    
    if (isVisible) {
        details.style.display = 'none';
        button.textContent = 'تفاصيل أكثر';
        // إضافة تأثير إخفاء
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
    } else {
        details.style.display = 'block';
        button.textContent = 'إخفاء التفاصيل';
        // إضافة تأثير ظهور
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 10);
    }
}

// دالة إظهار الرسوم البيانية
function showChart(chartId) {
    const chart = document.getElementById(chartId);
    const block = chart.closest('.interactive-block');
    const button = block.querySelector('.action-btn[data-action="chart"]');
    
    if (!chart) {
        console.error('Chart element not found:', chartId);
        return;
    }
    
    if (chart.style.display === 'none') {
        // إظهار الرسم البياني
        chart.style.display = 'block';
        button.textContent = 'إخفاء الرسم البياني';
        
        // إضافة تأثير ظهور للرسم البياني
        chart.style.opacity = '0';
        chart.style.transform = 'scale(0.9)';
        
        // إضافة فئة التحميل
        chart.classList.add('loading');
        
        // محاولة تحميل Chart.js إذا لم يكن محملاً
        loadChartJS()
            .then(() => {
                return createChartWithRetry(chartId);
            })
            .then(() => {
                chart.classList.remove('loading');
                
                // تأثير ظهور تدريجي
                setTimeout(() => {
                    chart.style.opacity = '1';
                    chart.style.transform = 'scale(1)';
                }, 100);
            })
            .catch((error) => {
                console.error('Error creating chart:', chartId, error);
                chart.classList.remove('loading');
                chart.classList.add('error');
                
                // إظهار رسالة خطأ للمستخدم
                const errorMessage = document.createElement('div');
                errorMessage.style.cssText = `
                    color: #FF6B6B;
                    text-align: center;
                    padding: 15px;
                    background: rgba(255, 107, 107, 0.1);
                    border-radius: 8px;
                    margin: 10px 0;
                    font-size: 14px;
                `;
                errorMessage.textContent = 'حدث خطأ في تحميل الرسم البياني. يرجى المحاولة مرة أخرى.';
                chart.parentNode.insertBefore(errorMessage, chart);
                
                // إعادة تعيين الزر
                button.textContent = 'رسم بياني';
            });
    } else {
        // إخفاء الرسم البياني
        chart.style.opacity = '0';
        chart.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            chart.style.display = 'none';
            button.textContent = 'رسم بياني';
            
            // إزالة الرسوم البيانية من الذاكرة
            if (window.charts && window.charts[chartId]) {
                window.charts[chartId].destroy();
                delete window.charts[chartId];
            }
            
            // إزالة رسائل الخطأ
            const errorMessages = chart.parentNode.querySelectorAll('div[style*="color: #FF6B6B"]');
            errorMessages.forEach(msg => msg.remove());
            
            // إزالة فئات الحالة
            chart.classList.remove('loading', 'error');
        }, 300);
    }
}

// دالة إنشاء الرسوم البيانية
function createChart(chartId) {
    // التحقق من تحميل Chart.js
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Please check the CDN link.');
        return;
    }
    
    const chartElement = document.getElementById(chartId);
    if (!chartElement) {
        console.error('Chart element not found:', chartId);
        return;
    }
    
    const ctx = chartElement.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for chart:', chartId);
        return;
    }
    
    // إزالة الرسم البياني السابق إذا وجد
    if (window.charts && window.charts[chartId]) {
        window.charts[chartId].destroy();
    }
    
    if (!window.charts) window.charts = {};
    
    // إعدادات عامة للرسوم البيانية
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff',
                    font: {
                        family: 'Tajawal, sans-serif',
                        size: 12
                    },
                    padding: 15,
                    usePointStyle: true
                }
            }
        }
    };
    
    let chartData;
    
    try {
        switch(chartId) {
            case 'summary-chart':
                chartData = {
                    type: 'doughnut',
                    data: {
                        labels: ['العائد السنوي 35%', 'فترة الاسترداد 24 شهر', 'حصة السوق 10%'],
                        datasets: [{
                            data: [35, 24, 10],
                            backgroundColor: [
                                'rgba(78, 205, 196, 0.8)',
                                'rgba(255, 217, 61, 0.8)',
                                'rgba(255, 107, 107, 0.8)'
                            ],
                            borderColor: [
                                '#4ECDC4',
                                '#FFD93D',
                                '#FF6B6B'
                            ],
                            borderWidth: 3,
                            hoverBorderWidth: 5
                        }]
                    },
                    options: {
                        ...commonOptions,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#ffffff',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    },
                                    padding: 20,
                                    usePointStyle: true
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#ffffff',
                                bodyColor: '#ffffff',
                                borderColor: '#4ECDC4',
                                borderWidth: 1
                            }
                        },
                        cutout: '60%'
                    }
                };
                break;
                
            case 'vision-chart':
                chartData = {
                    type: 'bar',
                    data: {
                        labels: ['الزوار الشهري', 'الأعضاء النشطون', 'ورش العمل', 'التوسع'],
                        datasets: [{
                            label: 'الأهداف الاستراتيجية',
                            data: [3000, 500, 12, 2],
                            backgroundColor: [
                                'rgba(78, 205, 196, 0.8)',
                                'rgba(255, 217, 61, 0.8)',
                                'rgba(255, 107, 107, 0.8)',
                                'rgba(106, 103, 206, 0.8)'
                            ],
                            borderColor: [
                                '#4ECDC4',
                                '#FFD93D',
                                '#FF6B6B',
                                '#6A67CE'
                            ],
                            borderWidth: 2,
                            borderRadius: 5,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        ...commonOptions,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#ffffff',
                                bodyColor: '#ffffff',
                                borderColor: '#4ECDC4',
                                borderWidth: 1
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#ffffff',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    }
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                    drawBorder: false
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#ffffff',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    }
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                    drawBorder: false
                                }
                            }
                        }
                    }
                };
                break;
                
            case 'features-chart':
                chartData = {
                    type: 'radar',
                    data: {
                        labels: ['التفاعلية', 'الابتكار', 'المرونة', 'التوسع', 'الربحية'],
                        datasets: [{
                            label: 'The Lab',
                            data: [90, 85, 80, 75, 70],
                            backgroundColor: 'rgba(78, 205, 196, 0.2)',
                            borderColor: '#4ECDC4',
                            borderWidth: 3,
                            pointBackgroundColor: '#4ECDC4',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointHoverBackgroundColor: '#ffffff',
                            pointHoverBorderColor: '#4ECDC4',
                            pointHoverBorderWidth: 3,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: {
                        ...commonOptions,
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#ffffff',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    }
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#ffffff',
                                bodyColor: '#ffffff',
                                borderColor: '#4ECDC4',
                                borderWidth: 1
                            }
                        },
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 100,
                                min: 0,
                                ticks: {
                                    color: '#ffffff',
                                    backdropColor: 'transparent',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    },
                                    stepSize: 20
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                    circular: true
                                },
                                pointLabels: {
                                    color: '#ffffff',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    }
                                }
                            }
                        }
                    }
                };
                break;
                
            case 'costs-chart':
                chartData = {
                    type: 'pie',
                    data: {
                        labels: ['تكاليف التأسيس', 'المعدات والتجهيزات', 'رأس مال تشغيلي', 'تسويق وإطلاق'],
                        datasets: [{
                            data: [30, 40, 20, 10],
                            backgroundColor: [
                                'rgba(78, 205, 196, 0.8)',
                                'rgba(255, 217, 61, 0.8)',
                                'rgba(255, 107, 107, 0.8)',
                                'rgba(106, 103, 206, 0.8)'
                            ],
                            borderColor: [
                                '#4ECDC4',
                                '#FFD93D',
                                '#FF6B6B',
                                '#6A67CE'
                            ],
                            borderWidth: 3,
                            hoverBorderWidth: 5
                        }]
                    },
                    options: {
                        ...commonOptions,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#ffffff',
                                    font: {
                                        family: 'Tajawal, sans-serif',
                                        size: 11
                                    },
                                    padding: 20,
                                    usePointStyle: true
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: '#ffffff',
                                bodyColor: '#ffffff',
                                borderColor: '#4ECDC4',
                                borderWidth: 1,
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': ' + context.parsed + '%';
                                    }
                                }
                            }
                        }
                    }
                };
                break;
                
            default:
                console.error('Unknown chart ID:', chartId);
                return;
        }
        
        if (chartData) {
            // تعيين ارتفاع ثابت للرسوم البيانية
            chartElement.style.height = '350px';
            chartElement.style.width = '100%';
            
            // إنشاء الرسم البياني
            window.charts[chartId] = new Chart(ctx, chartData);
            console.log('Chart created successfully:', chartId);
            
            // إضافة تأثير ظهور تدريجي
            chartElement.style.opacity = '0';
            setTimeout(() => {
                chartElement.style.opacity = '1';
            }, 100);
        }
        
    } catch (error) {
        console.error('Error creating chart:', chartId, error);
        // إظهار رسالة خطأ للمستخدم
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            color: #FF6B6B;
            text-align: center;
            padding: 20px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 10px;
            margin: 10px 0;
        `;
        errorMessage.textContent = 'حدث خطأ في تحميل الرسم البياني. يرجى المحاولة مرة أخرى.';
        chartElement.parentNode.insertBefore(errorMessage, chartElement);
        
        // إضافة فئة الخطأ للعنصر
        chartElement.classList.add('error');
    }
}

// دالة تحريك أشرطة التكاليف
function animateCostBars() {
    const costBars = document.querySelectorAll('.cost-fill');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
                
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    costBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// دالة إضافة تأثيرات إضافية للعناصر التفاعلية
function addInteractiveEffects() {
    // تأثير للعناصر المترية
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثير للبطاقات
    const cards = document.querySelectorAll('.vision-card, .mission-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // تأثير للبحث
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('focusin', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        searchBox.addEventListener('focusout', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// استدعاء دالة التأثيرات الإضافية
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addInteractiveEffects, 1000);
});

// دالة للتحقق من تحميل Chart.js
function ensureChartJSLoaded() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return false;
    }
    return true;
}

// دالة تحميل Chart.js بشكل ديناميكي إذا لم يكن محملاً
function loadChartJS() {
    return new Promise((resolve, reject) => {
        if (typeof Chart !== 'undefined') {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';
        script.onload = () => {
            console.log('Chart.js loaded successfully');
            resolve();
        };
        script.onerror = () => {
            console.error('Failed to load Chart.js');
            reject(new Error('Failed to load Chart.js'));
        };
        document.head.appendChild(script);
    });
}

// دالة تحسين إنشاء الرسوم البيانية
function createChartWithRetry(chartId, maxRetries = 3) {
    return new Promise((resolve, reject) => {
        let retries = 0;
        
        const attempt = () => {
            try {
                if (typeof Chart === 'undefined') {
                    if (retries < maxRetries) {
                        retries++;
                        console.log(`Retrying chart creation (${retries}/${maxRetries})`);
                        setTimeout(attempt, 1000);
                        return;
                    } else {
                        const error = new Error('Chart.js not available after retries');
                        handleChartError(chartId, error);
                        reject(error);
                        return;
                    }
                }
                
                createChart(chartId);
                resolve();
            } catch (error) {
                if (retries < maxRetries) {
                    retries++;
                    console.log(`Retrying chart creation after error (${retries}/${maxRetries})`);
                    setTimeout(attempt, 1000);
                } else {
                    handleChartError(chartId, error);
                    reject(error);
                }
            }
        };
        
        attempt();
    });
}

// دالة تحسين الرسوم البيانية عند تحميل الصفحة
function initializeCharts() {
    // إضافة مراقب للرسوم البيانية
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                chart.classList.add('in-view');
                
                // إزالة المراقب بعد إضافة الفئة
                chartObserver.unobserve(chart);
            }
        });
    }, { threshold: 0.1 });
    
    // مراقبة جميع الرسوم البيانية
    const charts = document.querySelectorAll('.interactive-chart');
    charts.forEach(chart => {
        chartObserver.observe(chart);
    });
}

// دالة تنظيف الرسوم البيانية
function cleanupCharts() {
    if (window.charts) {
        Object.keys(window.charts).forEach(chartId => {
            if (window.charts[chartId]) {
                window.charts[chartId].destroy();
            }
        });
        window.charts = {};
    }
    
    // إزالة رسائل الخطأ
    const errorMessages = document.querySelectorAll('.chart-error-message');
    errorMessages.forEach(msg => msg.remove());
}

// دالة إعادة تحميل الرسوم البيانية
function reloadCharts() {
    cleanupCharts();
    
    // إعادة تحميل الرسوم البيانية المرئية
    const visibleCharts = document.querySelectorAll('.interactive-chart[style*="display: block"]');
    visibleCharts.forEach(chart => {
        const chartId = chart.id;
        if (chartId) {
            setTimeout(() => {
                createChartWithRetry(chartId);
            }, 100);
        }
    });
}

// دالة تحسين أداء الرسوم البيانية
function optimizeChartPerformance() {
    // تعطيل الرسوم البيانية غير المرئية
    const charts = document.querySelectorAll('.interactive-chart');
    charts.forEach(chart => {
        if (chart.style.display === 'none') {
            chart.style.visibility = 'hidden';
        } else {
            chart.style.visibility = 'visible';
        }
    });
    
    // إضافة فئة التحميل البطيء للرسوم البيانية التي تستغرق وقتاً طويلاً
    const loadingCharts = document.querySelectorAll('.interactive-chart.loading');
    loadingCharts.forEach(chart => {
        setTimeout(() => {
            if (chart.classList.contains('loading')) {
                chart.classList.remove('loading');
                chart.classList.add('slow-loading');
            }
        }, 3000);
    });
}

// دالة معالجة أخطاء الرسوم البيانية
function handleChartError(chartId, error) {
    console.error('Chart error for:', chartId, error);
    
    const chartElement = document.getElementById(chartId);
    if (!chartElement) return;
    
    // إزالة فئات الحالة
    chartElement.classList.remove('loading', 'slow-loading');
    chartElement.classList.add('error');
    
    // إظهار رسالة خطأ للمستخدم
    const existingError = chartElement.parentNode.querySelector('.chart-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'chart-error-message';
    errorMessage.style.cssText = `
        color: #FF6B6B;
        text-align: center;
        padding: 15px;
        background: rgba(255, 107, 107, 0.1);
        border-radius: 8px;
        margin: 10px 0;
        font-size: 14px;
        border: 1px solid rgba(255, 107, 107, 0.3);
    `;
    
    let errorText = 'حدث خطأ في تحميل الرسم البياني.';
    if (error.message.includes('Chart.js')) {
        errorText = 'مشكلة في تحميل مكتبة الرسوم البيانية. يرجى تحديث الصفحة.';
    } else if (error.message.includes('context')) {
        errorText = 'مشكلة في عرض الرسم البياني. يرجى المحاولة مرة أخرى.';
    }
    
    errorMessage.textContent = errorText;
    chartElement.parentNode.insertBefore(errorMessage, chartElement);
}

// دالة إعادة محاولة تحميل الرسوم البيانية
function retryChartLoading(chartId) {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) return;
    
    // إزالة رسائل الخطأ
    const errorMessages = chartElement.parentNode.querySelectorAll('.chart-error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // إزالة فئات الحالة
    chartElement.classList.remove('error', 'slow-loading');
    chartElement.classList.add('loading');
    
    // إعادة محاولة إنشاء الرسم البياني
    setTimeout(() => {
        createChartWithRetry(chartId)
            .then(() => {
                chartElement.classList.remove('loading');
            })
            .catch((error) => {
                handleChartError(chartId, error);
            });
    }, 500);
}

// إضافة مستمع لحدث تغيير حجم النافذة
window.addEventListener('resize', () => {
    // إعادة تحميل الرسوم البيانية بعد تغيير حجم النافذة
    setTimeout(() => {
        reloadCharts();
        optimizeChartPerformance();
    }, 300);
});

// إضافة مستمع لحدث تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الرسوم البيانية
    setTimeout(() => {
        initializeCharts();
        optimizeChartPerformance();
    }, 1000);
    
    // تنظيف الرسوم البيانية عند مغادرة الصفحة
    window.addEventListener('beforeunload', cleanupCharts);
    
    // تحسين الأداء عند التمرير
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(optimizeChartPerformance, 100);
    });
});



// نظام التحميل المتقدم
class LoadingSystem {
    constructor() {
        this.overlay = null;
        this.init();
    }
    
    init() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'loading-overlay';
        this.overlay.style.display = 'none';
        
        document.body.appendChild(this.overlay);
    }
    
    show() {
        this.overlay.style.display = 'flex';
    }
    
    hide() {
        this.overlay.style.display = 'none';
    }
}

// نظام النوافذ المنبثقة المتقدم
class ModalSystem {
    constructor() {
        this.modals = new Map();
    }
    
    create(id, content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal-advanced';
        modal.id = id;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = content;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        this.modals.set(id, modal);
        
        // إضافة زر الإغلاق إذا لم يكن موجوداً
        if (!modalContent.querySelector('.modal-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'btn-advanced modal-close';
            closeBtn.textContent = 'إغلاق';
            closeBtn.onclick = () => this.close(id);
            modalContent.appendChild(closeBtn);
        }
        
        return modal;
    }
    
    show(id) {
        const modal = this.modals.get(id);
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    close(id) {
        const modal = this.modals.get(id);
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    remove(id) {
        const modal = this.modals.get(id);
        if (modal) {
            modal.remove();
            this.modals.delete(id);
        }
    }
}

// نظام التمرير المتقدم
class ScrollSystem {
    constructor() {
        this.init();
    }
    
    init() {
        // إضافة مؤشر التمرير
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        
        indicator.appendChild(progress);
        document.body.appendChild(indicator);
        
        // تحديث مؤشر التمرير
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progress.style.width = scrollPercent + '%';
        });
    }
}



// نظام التصنيف المتقدم
class RatingSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            maxRating: 5,
            currentRating: 0,
            onRatingChange: null,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.container.className = 'rating-advanced';
        this.render();
    }
    
    render() {
        this.container.innerHTML = '';
        
        for (let i = 1; i <= this.options.maxRating; i++) {
            const star = document.createElement('span');
            star.className = 'rating-star';
            star.textContent = '★';
            
            if (i <= this.options.currentRating) {
                star.classList.add('active');
            }
            
            star.onclick = () => this.setRating(i);
            star.onmouseenter = () => this.highlightStars(i);
            star.onmouseleave = () => this.resetHighlight();
            
            this.container.appendChild(star);
        }
    }
    
    setRating(rating) {
        this.options.currentRating = rating;
        this.render();
        
        if (this.options.onRatingChange) {
            this.options.onRatingChange(rating);
        }
    }
    
    highlightStars(rating) {
        const stars = this.container.querySelectorAll('.rating-star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#FFA726';
            } else {
                star.style.color = '#FFD93D';
            }
        });
    }
    
    resetHighlight() {
        const stars = this.container.querySelectorAll('.rating-star');
        stars.forEach((star, index) => {
            if (index < this.options.currentRating) {
                star.style.color = '#FFD93D';
            } else {
                star.style.color = '#FFD93D';
            }
        });
    }
}

// نظام التقدم المتقدم
class ProgressSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            value: 0,
            max: 100,
            animated: true,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.container.className = 'progress-advanced';
        
        const bar = document.createElement('div');
        bar.className = 'progress-bar-advanced';
        bar.style.width = '0%';
        
        this.container.appendChild(bar);
        this.bar = bar;
        
        this.update(this.options.value);
    }
    
    update(value) {
        const percentage = (value / this.options.max) * 100;
        
        if (this.options.animated) {
            this.bar.style.transition = 'width 0.5s ease';
        } else {
            this.bar.style.transition = 'none';
        }
        
        this.bar.style.width = percentage + '%';
    }
    
    animate(from, to, duration = 1000) {
        const start = performance.now();
        const change = to - from;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = from + (change * progress);
            this.update(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// تهيئة الأنظمة المتقدمة
let loadingSystem, modalSystem, scrollSystem;

// دالة تهيئة الميزات المتقدمة
function initializeAdvancedFeatures() {
    // تهيئة أنظمة الميزات المتقدمة
    loadingSystem = new LoadingSystem();
    modalSystem = new ModalSystem();
    scrollSystem = new ScrollSystem();
    
    // إضافة تأثيرات متقدمة للعناصر
    addAdvancedEffects();
    
    // إضافة مستمعي الأحداث المتقدمة
    addAdvancedEventListeners();
    
    console.log('Advanced features initialized successfully');
}

// دالة إضافة التأثيرات المتقدمة
function addAdvancedEffects() {
    // إضافة تأثيرات للبطاقات
    const cards = document.querySelectorAll('.business-block, .investor-card, .feature-item');
    cards.forEach(card => {
        card.classList.add('card-3d');
    });
    
    // إضافة تأثيرات للأيقونات
    const icons = document.querySelectorAll('.feature-icon, .investor-icon');
    icons.forEach(icon => {
        icon.classList.add('icon-animated');
    });
    
    // إضافة تأثيرات للخلفيات
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animated-background');
    });
    
    // إضافة تأثيرات للنصوص
    const titles = document.querySelectorAll('h1, h2');
    titles.forEach(title => {
        title.classList.add('text-gradient');
    });
}

// دالة إضافة مستمعي الأحداث المتقدمة
function addAdvancedEventListeners() {

}

// دالة إظهار نافذة منبثقة متقدمة
function showAdvancedModal(title, content) {
    const modalId = 'advanced-modal-' + Date.now();
    const modalContent = `
        <h3>${title}</h3>
        <div>${content}</div>
    `;
    
    modalSystem.create(modalId, modalContent);
    modalSystem.show(modalId);
    
    return modalId;
}

// دالة إظهار نظام التصنيف
function showRatingSystem(container, options = {}) {
    return new RatingSystem(container, options);
}

// دالة إظهار نظام التقدم
function showProgressSystem(container, options = {}) {
    return new ProgressSystem(container, options);
}

// دالة تحسين الرسوم البيانية مع الميزات المتقدمة
function enhanceChartWithAdvancedFeatures(chartId) {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) return;
    
    // إضافة تأثيرات متقدمة للرسم البياني
    chartElement.classList.add('card-3d');
    
    // إضافة مؤشر تحميل
    loadingSystem.show();
    
    // إنشاء الرسم البياني
    createChartWithRetry(chartId)
        .then(() => {
            loadingSystem.hide();
            notificationSystem.success('تم تحميل الرسم البياني بنجاح');
            
            // إطلاق حدث نجاح تحميل الرسم البياني
            document.dispatchEvent(new CustomEvent('chartLoaded', {
                detail: { chartId }
            }));
        })
        .catch((error) => {
            loadingSystem.hide();
            notificationSystem.error('حدث خطأ في تحميل الرسم البياني');
            
            // إطلاق حدث خطأ تحميل الرسم البياني
            document.dispatchEvent(new CustomEvent('chartError', {
                detail: { chartId, error }
            }));
        });
}

// تهيئة الميزات المتقدمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الميزات المتقدمة بعد فترة قصيرة
    setTimeout(initializeAdvancedFeatures, 1000);
    
    // إضافة تأثيرات للعناصر الموجودة
    setTimeout(addAdvancedEffects, 2000);
    
    // تهيئة أنظمة التصنيف والتقدم
    setTimeout(initializeRatingAndProgress, 3000);
    
    // استبدال دالة showChart بالنسخة المتقدمة
    setTimeout(() => {
        // تحديث مستمعي الأحداث للأزرار
        const chartButtons = document.querySelectorAll('.action-btn[data-action="chart"]');
        chartButtons.forEach(button => {
            button.onclick = function() {
                const chartId = this.getAttribute('data-chart-id');
                if (chartId) {
                    showChartAdvanced(chartId);
                }
            };
        });
    }, 1000);
});
