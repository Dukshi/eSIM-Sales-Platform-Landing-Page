import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, SmartphoneIcon, CheckCircleIcon, DollarSignIcon } from 'lucide-react';
import { Button } from './Button';
type Message = {
  id: string;
  type: 'user' | 'ai';
  content: string;
  options?: {
    type: 'countries' | 'carriers' | 'plans' | 'buttons';
    items: Array<{
      id: string;
      text: string;
      action?: string;
    }>;
  };
  comparison?: {
    roaming: {
      price: number;
      details: string;
    };
    eSim: {
      price: number;
      details: string;
    };
  };
};
export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const destinations = [{
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
  }];
  const carriers = [{
    id: 'irancell',
    text: 'ایرانسل'
  }, {
    id: 'mci',
    text: 'همراه اول'
  }];
  const plans = [{
    id: 'basic',
    text: 'ترکیه | 5GB | 7 روز | 9.99$'
  }, {
    id: 'standard',
    text: 'ترکیه | 10GB | 14 روز | 19.99$'
  }, {
    id: 'premium',
    text: 'ترکیه | نامحدود | 30 روز | 29.99$'
  }];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'ai',
        content: 'سلام 👋 کجا می‌خوای سفر بری؟',
        options: {
          type: 'countries',
          items: destinations
        }
      }]);
    }
  }, []);
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
          content: 'می‌خوای مقایسه کنم ببینی با سیم‌کارت خودت و رومینگ باشی به‌صرفه‌تره یا eSIM؟',
          options: {
            type: 'carriers',
            items: carriers
          }
        };
        break;
      case 'carriers':
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: 'مدل گوشیت رو می‌گی ببینم ساپورت می‌کنه eSIM یا نه؟',
          options: {
            type: 'buttons',
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
        break;
      default:
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: 'می‌خوای پلن‌های قیمتیمون رو ببینی؟',
          options: {
            type: 'plans',
            items: plans
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
        type: 'plans',
        items: plans
      }
    };
    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };
  return <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-md" dir="rtl">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center">
            <SmartphoneIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg font-[Vazirmatn]">
              دستیار سفر شما
            </h3>
            <p className="text-sm text-gray-500 font-[Vazirmatn]">
              بهترین گزینه رو برات پیدا می‌کنم
            </p>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-6 space-y-4">
        {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 ${message.type === 'user' ? 'bg-[#DBEAFE] text-gray-800 rounded-bl-none' : 'bg-[#F3F4F6] text-gray-800 rounded-br-none'}`}>
              <p className="text-[14px] font-[Vazirmatn]">{message.content}</p>
              {message.options && <div className="mt-3 space-y-2">
                  {message.options.items.map(item => <button key={item.id} onClick={() => handleOptionSelect(item.id, message.options?.type || '')} className={`w-full text-right px-4 py-3 text-sm rounded-full transition-colors font-[Vazirmatn] ${item.action === 'primary' ? 'bg-[#F97316] text-white hover:bg-[#EA580C]' : 'border border-[#2563EB] text-[#2563EB] hover:bg-blue-50'}`}>
                      {item.text}
                    </button>)}
                </div>}
            </div>
          </div>)}
        {isTyping && <div className="flex justify-end items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
          </div>}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-6 border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button type="submit" variant="primary" size="sm">
            <SendIcon className="w-4 h-4" />
          </Button>
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="پیام خود را بنویسید..." className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-[Vazirmatn] text-right" />
        </form>
      </div>
    </div>;
}