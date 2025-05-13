import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, SmartphoneIcon, GlobeIcon, WifiIcon, DollarSignIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from './Button';
type Language = 'fa' | 'ar' | 'en' | 'ur';
type Message = {
  id: string;
  type: 'user' | 'ai';
  content: string;
  options?: {
    type: 'countries' | 'carriers' | 'plans' | 'buttons' | 'compare_options' | 'device_check' | 'after_compare' | 'plans' | 'plans_after_coverage' | 'checkout' | 'checkout_form' | 'after_install_info';
    items: Array<{
      id: string;
      text: string;
      action?: string;
    }>;
  };
};
const translations = {
  fa: {
    dir: 'rtl',
    font: 'Vazirmatn',
    header: {
      title: 'دستیار سفر شما',
      subtitle: 'بهترین گزینه رو برات پیدا می‌کنم'
    },
    greeting: 'سلام 👋 کجا می‌خوای سفر بری؟',
    placeholder: 'پیام خود را بنویسید...',
    countries: [{
      id: 'turkey',
      text: 'ترکیه'
    }, {
      id: 'uae',
      text: 'امارات'
    }, {
      id: 'iraq',
      text: 'عراق'
    }, {
      id: 'georgia',
      text: 'گرجستان'
    }, {
      id: 'europe',
      text: 'اروپا'
    }],
    carriers: [{
      id: 'irancell',
      text: 'ایرانسل'
    }, {
      id: 'mci',
      text: 'همراه اول'
    }],
    compareQuestion: 'می‌خوای مقایسه کنم ببینی با سیم‌کارت خودت و رومینگ باشی به‌صرفه‌تره یا eSIM؟',
    deviceQuestion: 'مدل گوشیت رو می‌گی ببینم ساپورت می‌کنه eSIM یا نه؟',
    viewPlans: 'پلن‌ها رو نشون بده',
    checkDevice: 'اول گوشیم رو چک کنم'
  },
  ar: {
    dir: 'rtl',
    font: 'IBM Plex Sans Arabic',
    header: {
      title: 'مساعد السفر الخاص بك',
      subtitle: 'سأجد لك أفضل خيار'
    },
    greeting: 'مرحباً 👋 إلى أين تريد السفر؟',
    placeholder: 'اكتب رسالتك...',
    countries: [{
      id: 'turkey',
      text: 'تركيا'
    }, {
      id: 'uae',
      text: 'الإمارات'
    }, {
      id: 'iraq',
      text: 'العراق'
    }, {
      id: 'georgia',
      text: 'جورجيا'
    }, {
      id: 'europe',
      text: 'أوروبا'
    }],
    carriers: [{
      id: 'etisalat',
      text: 'اتصالات'
    }, {
      id: 'du',
      text: 'دو'
    }],
    compareQuestion: 'هل تريد مقارنة التكلفة بين شريحة الجوال الحالية والتجوال مع eSIM؟',
    deviceQuestion: 'ما هو طراز هاتفك لنتحقق من دعم eSIM؟',
    viewPlans: 'عرض الباقات',
    checkDevice: 'تحقق من جهازي أولاً'
  },
  en: {
    dir: 'ltr',
    font: 'Inter',
    header: {
      title: 'Your Travel Assistant',
      subtitle: "I'll find the best option for you"
    },
    greeting: 'Hi 👋 Where would you like to travel?',
    placeholder: 'Type your message...',
    countries: [{
      id: 'turkey',
      text: 'Turkey'
    }, {
      id: 'uae',
      text: 'UAE'
    }, {
      id: 'iraq',
      text: 'Iraq'
    }, {
      id: 'georgia',
      text: 'Georgia'
    }, {
      id: 'europe',
      text: 'Europe'
    }],
    carriers: [{
      id: 'vodafone',
      text: 'Vodafone'
    }, {
      id: 'ee',
      text: 'EE'
    }],
    compareQuestion: 'Would you like to compare costs between your current SIM roaming and eSIM?',
    deviceQuestion: 'What phone model do you have? Let me check if it supports eSIM.',
    viewPlans: 'View Plans',
    checkDevice: 'Check My Device First'
  },
  ur: {
    dir: 'rtl',
    font: 'Noto Nastaliq Urdu',
    header: {
      title: 'آپ کا سفری معاون',
      subtitle: 'میں آپ کے لیے بہترین آپشن تلاش کروں گا'
    },
    greeting: 'السلام علیکم 👋 آپ کہاں سفر کرنا چاہتے ہیں؟',
    placeholder: 'اپنا پیغام لکھیں...',
    countries: [{
      id: 'turkey',
      text: 'ترکی'
    }, {
      id: 'uae',
      text: 'متحدہ عرب امارات'
    }, {
      id: 'iraq',
      text: 'عراق'
    }, {
      id: 'georgia',
      text: 'جارجیا'
    }, {
      id: 'europe',
      text: 'یورپ'
    }],
    carriers: [{
      id: 'jazz',
      text: 'جاز'
    }, {
      id: 'telenor',
      text: 'ٹیلی نور'
    }],
    compareQuestion: 'کیا آپ موجودہ سم روومنگ اور ای سم کے درمیان لاگت کا موازنہ کرنا چاہیں گے؟',
    deviceQuestion: 'آپ کے پاس کون سا فون ماڈل ہے؟ میں چیک کرتا ہوں کہ یہ ای سم کو سپورٹ کرتا ہے یا نہیں۔',
    viewPlans: 'پلان دیکھیں',
    checkDevice: 'پہلے میرا فون چیک کریں'
  }
};
const roamingInfo = {
  irancell: {
    turkey: {
      price: 15,
      speed: '3G/4G',
      coverage: '80%'
    },
    uae: {
      price: 18,
      speed: '4G',
      coverage: '85%'
    },
    europe: {
      price: 20,
      speed: '4G',
      coverage: '90%'
    }
  },
  mci: {
    turkey: {
      price: 12,
      speed: '3G',
      coverage: '75%'
    },
    uae: {
      price: 16,
      speed: '4G',
      coverage: '80%'
    },
    europe: {
      price: 22,
      speed: '4G',
      coverage: '85%'
    }
  }
};
const esimNetworkInfo = {
  turkey: {
    speed: '4G/5G',
    coverage: '95%',
    operators: ['Turkcell', 'Vodafone']
  },
  uae: {
    speed: '5G',
    coverage: '98%',
    operators: ['Etisalat', 'Du']
  },
  europe: {
    speed: '4G/5G',
    coverage: '97%',
    operators: ['Multiple carriers']
  }
};
export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: t.greeting,
      options: {
        type: 'countries',
        items: t.countries
      }
    }]);
  }, [language]);
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };
  const handleOptionSelect = async (optionId: string, type: string) => {
    const selectedOption = {
      countries: destinations,
      carriers: carriers,
      plans: plans
    }[type]?.find(item => item.id === optionId);
    if (!selectedOption) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: selectedOption.text
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    let aiResponse: Message;
    switch (type) {
      case 'countries':
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: 'می‌خوای مقایسه کنم ببینی با سیم‌کارت خودت و رومینگ باشی به‌صرفه‌تره یا eSIM؟\n\nمی‌تونم این موارد رو مقایسه کنم:\n• قیمت\n• سرعت اینترنت\n• پوشش شبکه',
          options: {
            type: 'compare_options',
            items: [{
              id: 'compare',
              text: 'آره، مقایسه کن',
              action: 'primary'
            }, {
              id: 'skip',
              text: 'نه، مستقیم پلن‌ها رو ببینم'
            }]
          }
        };
        break;
      case 'compare_options':
        if (optionId === 'compare') {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'اپراتور فعلیت کدومه؟',
            options: {
              type: 'carriers',
              items: carriers
            }
          };
        } else {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'اول بذار ببینم گوشیت eSIM رو پشتیبانی می‌کنه. چه مدلی داری؟',
            options: {
              type: 'device_check',
              items: [{
                id: 'iphone',
                text: 'آیفون دارم'
              }, {
                id: 'samsung',
                text: 'سامسونگ دارم'
              }, {
                id: 'other',
                text: 'گوشی دیگه'
              }]
            }
          };
        }
        break;
      case 'carriers':
        const carrierInfo = roamingInfo[optionId]?.turkey;
        const esimInfo = esimNetworkInfo.turkey;
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: `مقایسه رومینگ ${selectedOption.text} با eSIM ما در ترکیه:
📱 رومینگ ${selectedOption.text}:
• هر گیگ: ${carrierInfo.price}$
• سرعت: ${carrierInfo.speed}
• پوشش: ${carrierInfo.coverage}
🌐 eSIM ما:
• ۵ گیگ فقط ${plans[0].price}$
• سرعت: ${esimInfo.speed}
• پوشش: ${esimInfo.coverage}
• اپراتورها: ${esimInfo.operators.join(', ')}
می‌خوای پلن‌های بیشتر رو ببینی؟`,
          options: {
            type: 'after_compare',
            items: [{
              id: 'view_plans',
              text: 'پلن‌ها رو نشون بده',
              action: 'primary'
            }, {
              id: 'device_check',
              text: 'اول گوشیم رو چک کنم'
            }, {
              id: 'coverage_details',
              text: 'جزئیات پوشش شبکه'
            }]
          }
        };
        break;
      case 'after_compare':
        if (optionId === 'view_plans') {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'این پلن‌های ما برای ترکیه هستن:',
            options: {
              type: 'plans',
              items: plans.map(plan => ({
                ...plan,
                action: plan.id === 'basic' ? 'primary' : undefined
              }))
            }
          };
        } else if (optionId === 'coverage_details') {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: `پوشش شبکه ما در ترکیه:
• شهرهای اصلی: پوشش 5G/4G کامل
• مناطق توریستی: پوشش 4G گسترده
• حومه شهرها: حداقل 4G/3G
• اپراتورهای همکار: ${esimNetworkInfo.turkey.operators.join(', ')}
می‌خوای پلن‌ها رو ببینی؟`,
            options: {
              type: 'plans_after_coverage',
              items: [{
                id: 'view_plans',
                text: 'پلن‌ها رو نشون بده',
                action: 'primary'
              }, {
                id: 'ask_more',
                text: 'سوال دیگه‌ای دارم'
              }]
            }
          };
        }
        break;
      case 'plans':
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: 'این پلن رو ��نتخاب کردی. می‌خوای همین الان خرید کنی؟',
          options: {
            type: 'checkout',
            items: [{
              id: 'buy_now',
              text: 'آره، خرید رو شروع کن',
              action: 'primary'
            }, {
              id: 'more_info',
              text: 'سوال دارم در مورد نصب'
            }, {
              id: 'coverage',
              text: 'پوشش شبکه چطوره؟'
            }]
          }
        };
        break;
      case 'checkout':
        if (optionId === 'buy_now') {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'برای تکمیل خرید، لطفاً اطلاعات زیر رو وارد کن:',
            options: {
              type: 'checkout_form',
              items: [{
                id: 'email',
                text: 'ایمیل'
              }, {
                id: 'payment',
                text: 'اطلاعات پرداخت'
              }]
            }
          };
        } else if (optionId === 'more_info') {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: `نصب eSIM خیلی راحته:
1. بعد از خرید یه QR کد می‌گیری
2. میری تو تنظیمات گوشی > موبایل دیتا
3. "Add eSIM" یا "Add Data Plan" رو می‌زنی
4. QR کد رو اسکن می‌کنی
می‌خوای خرید رو شروع کنیم؟`,
            options: {
              type: 'after_install_info',
              items: [{
                id: 'start_purchase',
                text: 'بله، شروع کن',
                action: 'primary'
              }, {
                id: 'more_questions',
                text: 'سوال دیگه‌ای دارم'
              }]
            }
          };
        }
        break;
      case 'devices':
        if (optionId === 'iphone' || optionId === 'samsung' || optionId === 'pixel') {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'خوبه! گوشیت eSIM رو پشتیبانی می‌کنه. نصبش هم خیلی راحته - بعد از خرید یه QR کد می‌فرستیم که با اسکنش eSIM نصب میشه. می‌خوای پلن‌های مخصوص مقصدت رو ببینی؟',
            options: {
              type: 'buttons',
              items: [{
                id: 'view_plans',
                text: 'پلن‌ها رو نشون بده',
                action: 'primary'
              }, {
                id: 'installation',
                text: 'روش نصب رو توضیح بده'
              }, {
                id: 'ask_more',
                text: 'سوال دیگهای دارم'
              }]
            }
          };
        } else {
          aiResponse = {
            id: Date.now().toString(),
            type: 'ai',
            content: 'برای اطمینان از سازگاری گوشیت، مدل دقیقش رو بنویس تا چک کنم',
            options: {
              type: 'buttons',
              items: [{
                id: 'type_model',
                text: 'مدل گوشی رو بنویسم'
              }, {
                id: 'view_compatible',
                text: 'لیست گوشی‌های سازگار رو ببینم'
              }]
            }
          };
        }
        break;
      case 'plans':
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: 'می‌خوای همین الان خرید کنی یا سوال دیگه‌ای داری؟',
          options: {
            type: 'buttons',
            items: [{
              id: 'buy',
              text: 'خرید رو شروع کن',
              action: 'primary'
            }, {
              id: 'compare',
              text: 'با رومینگ مقایسه کن'
            }, {
              id: 'ask_more',
              text: 'سوال دیگه دارم'
            }]
          }
        };
        break;
      default:
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: 'می‌تونم کمک دیگه‌ای بکنم؟',
          options: {
            type: 'buttons',
            items: [{
              id: 'new_search',
              text: 'یه مقصد دیگه می‌خوام'
            }, {
              id: 'support',
              text: 'با پشتیبانی صحبت کنم'
            }]
          }
        };
    }
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const aiResponse: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: 'می‌خوای پلن‌های قیمتیمون رو ببینی؟',
      options: {
        type: 'buttons',
        items: [{
          id: 'show_plans',
          text: 'بله، پلن‌ها رو ببینم',
          action: 'primary'
        }, {
          id: 'ask_more',
          text: 'سوال دیگه‌ای دارم'
        }]
      }
    };
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };
  return <div className={`w-full max-w-[360px] bg-white rounded-2xl shadow-md`} dir={t.dir}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center">
              <SmartphoneIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className={`font-bold text-lg font-[${t.font}]`}>
                {t.header.title}
              </h3>
              <p className={`text-sm text-gray-500 font-[${t.font}]`}>
                {t.header.subtitle}
              </p>
            </div>
          </div>
          <div className="relative">
            <select value={language} onChange={e => handleLanguageChange(e.target.value as Language)} className="appearance-none bg-transparent border border-gray-200 rounded-lg px-2 py-1 pr-8">
              <option value="en">🇬🇧</option>
              <option value="ar">🇦🇪</option>
              <option value="fa">🇮🇷</option>
              <option value="ur">🇵🇰</option>
            </select>
            <GlobeIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-6 space-y-4">
        {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? t.dir === 'rtl' ? 'justify-start' : 'justify-end' : t.dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 ${message.type === 'user' ? 'bg-[#DBEAFE] text-gray-800 rounded-bl-none' : 'bg-[#F3F4F6] text-gray-800 rounded-br-none'}`}>
              <p className={`text-[14px] font-[${t.font}]`}>
                {message.content}
              </p>
              {message.options && <div className="mt-3 space-y-2">
                  {message.options.items.map(item => <button key={item.id} onClick={() => handleOptionSelect(item.id, message.options?.type || '')} className={`w-full text-${t.dir === 'rtl' ? 'right' : 'left'} px-4 py-3 text-sm rounded-full transition-colors font-[${t.font}] ${item.action === 'primary' ? 'bg-[#F97316] text-white hover:bg-[#EA580C]' : 'border border-[#2563EB] text-[#2563EB] hover:bg-blue-50'}`}>
                      {item.text}
                    </button>)}
                </div>}
            </div>
          </div>)}
        {isTyping && <div className={`flex ${t.dir === 'rtl' ? 'justify-start' : 'justify-end'} items-center space-x-2`}>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
          </div>}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-6 border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {t.dir === 'rtl' ? <>
              <Button type="submit" variant="primary" size="sm">
                <SendIcon className="w-4 h-4" />
              </Button>
              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={t.placeholder} className={`flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-[${t.font}] text-right`} />
            </> : <>
              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={t.placeholder} className={`flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-[${t.font}] text-left`} />
              <Button type="submit" variant="primary" size="sm">
                <SendIcon className="w-4 h-4" />
              </Button>
            </>}
        </form>
      </div>
    </div>;
}