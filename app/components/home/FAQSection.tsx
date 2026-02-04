const faqs = [
  {
    question: "What is DXN?",
    answer: "DXN is a multinational wellness company famous for its Ganoderma-based products. We focus on cultivating, processing, and marketing health supplements that promote natural healing."
  },
  {
    question: "Are DXN products safe to use?",
    answer: "Yes, absolutely. DXN products are cultivated organically without pesticides or harmful chemicals. They undergo strict quality control (ISO 14001, TGA) to ensure safety for daily consumption."
  },
  {
    question: "How can I order from your website?",
    answer: "It is simple! Browse our products, click on 'View Details' to read about them, and then click the 'Order via WhatsApp' button. We will handle payment and delivery details directly with you."
  },
  {
    question: "Does Dr. Iqbal offer online consultations?",
    answer: "Yes. Dr. Iqbal and our other specialists are available for video or voice consultations. You can book a slot through the 'Consult a Doctor' section on our homepage."
  },
  {
    question: "Do you offer cash on delivery?",
    answer: "Yes, we offer Cash on Delivery (COD) across most major cities in Pakistan. Shipping times are usually 2-4 working days."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Common questions about our products and services.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group border border-gray-200 bg-white rounded-xl shadow-sm [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all duration-300 open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-gray-900 font-medium hover:bg-gray-50 transition">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                
                {/* Icon wrapper - rotates when open */}
                <span className="shrink-0 rounded-full bg-gray-100 p-2 text-gray-900 transition-transform duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/50">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;