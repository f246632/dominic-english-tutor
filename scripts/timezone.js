// Timezone and Booking Functionality
document.addEventListener('DOMContentLoaded', function() {

    // Display current Croatian time
    function updateCroatianTime() {
        const croatianTime = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Zagreb",
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const chineseTime = new Date().toLocaleString("zh-CN", {
            timeZone: "Europe/Zagreb",
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Add time display to contact section if it doesn't exist
        const timeDisplay = document.getElementById('current-time-display');
        if (!timeDisplay) {
            const contactInfo = document.querySelector('.contact-info');
            if (contactInfo) {
                const timeElement = document.createElement('div');
                timeElement.id = 'current-time-display';
                timeElement.className = 'contact-item';
                timeElement.innerHTML = `
                    <i class="fas fa-clock"></i>
                    <div>
                        <h4>Current Time in Croatia | 克罗地亚当前时间</h4>
                        <p id="croatian-time">${croatianTime}</p>
                        <p class="chinese-text" id="chinese-time">${chineseTime}</p>
                        <small style="color: #94a3b8;">Updates every minute | 每分钟更新</small>
                    </div>
                `;
                contactInfo.insertBefore(timeElement, contactInfo.firstChild);
            }
        } else {
            document.getElementById('croatian-time').textContent = croatianTime;
            document.getElementById('chinese-time').textContent = chineseTime;
        }
    }

    // Update time immediately and then every minute
    updateCroatianTime();
    setInterval(updateCroatianTime, 60000);

    // Time zone converter helper
    function convertToCroatianTime(userTimeZone, userTime) {
        try {
            // This is a simplified converter - in production you'd use a proper timezone library
            const timeZoneOffsets = {
                'Beijing Time': 7, // Beijing is UTC+8, Croatia is UTC+1 (or UTC+2 in summer)
                'China Standard Time': 7,
                'CST': 7,
                'EST': -6, // Eastern Standard Time
                'PST': -9, // Pacific Standard Time
                'JST': 8,  // Japan Standard Time
                'GMT': -1, // Greenwich Mean Time
                'UTC': -1
            };

            const offset = timeZoneOffsets[userTimeZone] || 0;
            return `Approximately ${Math.abs(offset)} hours ${offset > 0 ? 'earlier' : 'later'} than your local time`;
        } catch (error) {
            return 'Please specify your timezone for accurate conversion';
        }
    }

    // Enhanced form submission with timezone handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const originalSubmitHandler = bookingForm.onsubmit;

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Enhanced validation
            if (!data.name || !data.email) {
                showAlert('Please fill in your name and email address.\n请填写您的姓名和邮箱地址。', 'warning');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showAlert('Please enter a valid email address.\n请输入有效的邮箱地址。', 'warning');
                return;
            }

            // Create enhanced booking summary
            const bookingSummary = createBookingSummary(data);
            showBookingConfirmation(bookingSummary);

            // Reset form
            this.reset();
        });
    }

    // Create booking summary
    function createBookingSummary(data) {
        const croatianTime = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Zagreb",
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return {
            name: data.name,
            email: data.email,
            phone: data.phone || 'Not provided',
            level: data.level || 'To be assessed',
            goals: data.goals || 'General English improvement',
            preferredTime: data['preferred-time'] || 'Flexible',
            userTimezone: data['timezone-info'] || 'Not specified',
            submissionTime: croatianTime,
            pricePerHour: '$100'
        };
    }

    // Enhanced booking confirmation modal
    function showBookingConfirmation(summary) {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-modal-content">
                <div class="booking-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>Booking Request Sent! | 预订请求已发送！</h2>
                </div>

                <div class="booking-summary">
                    <h3>Booking Summary | 预订摘要</h3>
                    <div class="summary-grid">
                        <div class="summary-item">
                            <strong>Student Name | 学生姓名:</strong>
                            <span>${summary.name}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Email | 邮箱:</strong>
                            <span>${summary.email}</span>
                        </div>
                        <div class="summary-item">
                            <strong>English Level | 英语水平:</strong>
                            <span>${summary.level}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Preferred Time | 首选时间:</strong>
                            <span>${summary.preferredTime}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Your Timezone | 您的时区:</strong>
                            <span>${summary.userTimezone}</span>
                        </div>
                        <div class="summary-item">
                            <strong>Price | 价格:</strong>
                            <span>${summary.pricePerHour} per hour | 每小时</span>
                        </div>
                    </div>
                </div>

                <div class="next-steps">
                    <h3>What happens next? | 接下来会发生什么？</h3>
                    <div class="steps">
                        <div class="step">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <strong>1. Email Confirmation | 邮件确认</strong>
                                <p>Dominic will email you within 24 hours | Dominic将在24小时内给您发邮件</p>
                            </div>
                        </div>
                        <div class="step">
                            <i class="fas fa-calendar-alt"></i>
                            <div>
                                <strong>2. Schedule Your Lesson | 安排课程</strong>
                                <p>We'll find the perfect time for both time zones | 我们会找到适合两个时区的完美时间</p>
                            </div>
                        </div>
                        <div class="step">
                            <i class="fas fa-video"></i>
                            <div>
                                <strong>3. Start Learning! | 开始学习！</strong>
                                <p>Get ready for your first English lesson | 准备好您的第一节英语课</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="booking-actions">
                    <button onclick="this.closest('.booking-modal').remove()" class="btn-close-booking">
                        Close | 关闭
                    </button>
                    <a href="mailto:dom.delic@gmail.com?subject=English Lesson Booking - ${summary.name}" class="btn-email">
                        <i class="fas fa-envelope"></i>
                        Email Dominic Directly | 直接给Dominic发邮件
                    </a>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }

            .booking-modal-content {
                background: white;
                padding: 2rem;
                border-radius: 16px;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                margin: 0 20px;
                animation: slideUp 0.3s ease;
            }

            .booking-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .booking-header i {
                color: #10b981;
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            .booking-header h2 {
                color: #1e293b;
                margin: 0;
            }

            .booking-summary {
                margin-bottom: 2rem;
            }

            .booking-summary h3 {
                color: #2563eb;
                border-bottom: 2px solid #e2e8f0;
                padding-bottom: 0.5rem;
                margin-bottom: 1rem;
            }

            .summary-grid {
                display: grid;
                gap: 1rem;
            }

            .summary-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                background: #f8fafc;
                border-radius: 8px;
            }

            .summary-item strong {
                color: #1e293b;
                flex: 1;
            }

            .summary-item span {
                color: #64748b;
                text-align: right;
                flex: 1;
            }

            .next-steps h3 {
                color: #2563eb;
                margin-bottom: 1rem;
            }

            .steps {
                display: grid;
                gap: 1rem;
                margin-bottom: 2rem;
            }

            .step {
                display: flex;
                gap: 1rem;
                align-items: flex-start;
            }

            .step i {
                color: #2563eb;
                font-size: 1.5rem;
                margin-top: 0.25rem;
            }

            .step strong {
                color: #1e293b;
                display: block;
                margin-bottom: 0.25rem;
            }

            .step p {
                color: #64748b;
                margin: 0;
                font-size: 0.9rem;
            }

            .booking-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .btn-close-booking {
                background: #6b7280;
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .btn-close-booking:hover {
                background: #4b5563;
            }

            .btn-email {
                background: #2563eb;
                color: white;
                text-decoration: none;
                padding: 0.75rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.3s ease;
            }

            .btn-email:hover {
                background: #1d4ed8;
                transform: translateY(-2px);
            }

            @media (max-width: 480px) {
                .booking-modal-content {
                    padding: 1.5rem;
                    margin: 0 10px;
                }

                .summary-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }

                .summary-item span {
                    text-align: left;
                }

                .booking-actions {
                    flex-direction: column;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 30000);
    }

    // Alert helper function
    function showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'warning' ? '#f59e0b' : '#2563eb'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        alert.textContent = message;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
});

// Booking availability checker (Croatian business hours)
function isBusinessHours() {
    const now = new Date();
    const croatianTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Zagreb"}));
    const hour = croatianTime.getHours();
    const day = croatianTime.getDay();

    // Monday = 1, Sunday = 0
    const isWeekend = day === 0 || day === 6;
    const isBusinessHour = hour >= 9 && hour <= 21;

    return {
        available: isBusinessHour,
        isWeekend: isWeekend,
        currentHour: hour,
        message: isBusinessHour ?
            'Dominic is likely available now | Dominic现在可能有空' :
            'Outside business hours - will respond within 24h | 非工作时间 - 将在24小时内回复'
    };
}

// Add availability indicator to the page
document.addEventListener('DOMContentLoaded', function() {
    const availability = isBusinessHours();
    const availabilityIndicator = document.createElement('div');
    availabilityIndicator.className = 'availability-indicator';
    availabilityIndicator.innerHTML = `
        <div class="availability-status ${availability.available ? 'available' : 'away'}">
            <i class="fas fa-circle"></i>
            <span>${availability.message}</span>
        </div>
    `;

    // Style the availability indicator
    const style = document.createElement('style');
    style.textContent = `
        .availability-indicator {
            position: fixed;
            bottom: 80px;
            right: 20px;
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        }

        .availability-status {
            background: rgba(255,255,255,0.95);
            padding: 0.75rem 1rem;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
        }

        .availability-status.available i {
            color: #10b981;
        }

        .availability-status.away i {
            color: #f59e0b;
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .availability-indicator {
                bottom: 70px;
                right: 10px;
            }

            .availability-status {
                font-size: 0.8rem;
                padding: 0.5rem 0.75rem;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(availabilityIndicator);
});