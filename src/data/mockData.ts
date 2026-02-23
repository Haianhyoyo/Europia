import { Service, News, Testimonial, Faq, WebsiteSetting } from '../types';

export const services: Service[] = [
    {
        id: '1',
        title: 'Thẩm Mỹ Ngoại Khoa',
        description: 'Kiến tạo vẻ đẹp chuẩn tỷ lệ vàng với công nghệ phẫu thuật ít xâm lấn tân tiến nhất từ Châu Âu.',
        image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800',
        features: ['Nâng mũi cấu trúc', 'Cắt mí Deep Eyes', 'Hút mỡ tạo cơ V-Line']
    },
    {
        id: '2',
        title: 'Trị Liệu Da Công Nghệ Cao',
        description: 'Giải pháp trẻ hóa và điều trị sắc tố da bằng hệ thống Laser và sóng siêu âm hội tụ hiện đại.',
        image: 'https://images.unsplash.com/photo-1570172619380-4104035d33ca?auto=format&fit=crop&q=80&w=800',
        features: ['Phác đồ trị nám Multi-Light', 'Trẻ hóa Thermage FLX', 'Căng chỉ Collagen nghệ thuật']
    },
    {
        id: '3',
        title: 'Y Học Tái Tạo',
        description: 'Tận dụng sức mạnh từ tế bào tự thân để phục hồi sức khỏe và tái tạo sự trẻ trung từ bên trong.',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
        features: ['Cấy tế bào gốc Stem Cell', 'Tiêm trẻ hóa PRP', 'Thanh lọc cơ thể Detox']
    },
    {
        id: '4',
        title: 'Chăm Sóc Sức Khỏe Toàn Diện',
        description: 'Hệ thống tầm soát và quản lý sức khỏe cá nhân hóa theo tiêu chuẩn quốc tế.',
        image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
        features: ['Tầm soát ung thư sớm', 'Xét nghiệm gen di truyền', 'Tư vấn dinh dưỡng chuyên sâu']
    }
];

export const news: News[] = [
    {
        id: '1',
        title: 'Europia nhận giải thưởng Phòng khám Quốc tế xuất sắc 2024',
        summary: 'Vinh dự được bình chọn là đơn vị tiên phong trong việc ứng dụng công nghệ làm đẹp an toàn tại khu vực.',
        image: 'https://images.unsplash.com/photo-1505751172157-519d9f494d77?auto=format&fit=crop&q=80&w=600',
        date: '15/02/2026'
    },
    {
        id: '2',
        title: 'Xu hướng thẩm mỹ bền vững: Khi vẻ đẹp song hành cùng sức khỏe',
        summary: 'Bác sĩ trưởng tại Europia chia sẻ về triết lý làm đẹp không đánh đổi bằng sức khỏe lâu dài.',
        image: 'https://images.unsplash.com/photo-1512138411135-e939fa23838e?auto=format&fit=crop&q=80&w=600',
        date: '10/02/2026'
    }
];

export const testimonials: Testimonial[] = [
    {
        id: '1',
        author: 'Elena Vũ',
        info: 'Doanh nhân - CEO Global Trade',
        content: 'Tại Europia, tôi không chỉ tìm lại được vẻ đẹp thanh xuân mà còn được trải nghiệm dịch vụ chăm sóc tận tâm như những người thân trong gia đình.',
        image: 'https://i.pravatar.cc/150?u=elena'
    },
    {
        id: '2',
        author: 'Marcus Trần',
        info: 'Nghệ sĩ Piano',
        content: 'Quy trình chuyên nghiệp, bác sĩ có gu thẩm mỹ rất tinh tế. Tôi hoàn toàn tin tưởng giao phó diện mạo của mình cho đội ngũ chuyên gia tại đây.',
        image: 'https://i.pravatar.cc/150?u=marcus'
    }
];

export const faqs: Faq[] = [
    {
        id: '1',
        question: 'Europia sử dụng công nghệ nào để đảm bảo an toàn?',
        answer: 'Chúng tôi cam kết 100% trang thiết bị nhập khẩu từ Châu Âu, đạt tiêu chuẩn FDA (Hoa Kỳ) và CE (Châu Âu).'
    },
    {
        id: '2',
        question: 'Quy trình đặt lịch hẹn có mất nhiều thời gian không?',
        answer: 'Hệ thống quản lý thông minh cho phép bạn đặt lịch chỉ trong 1 phút qua Hotline hoặc Website, cam kết không phải chờ đợi.'
    }
];

export const websiteSettings: WebsiteSetting = {
    address: 'Tầng 5, Tòa nhà Bitexco Financial, Quận 1, TP. Hồ Chí Minh',
    hotline: '1900 888 666',
    email: 'contact@europiaclinic.com',
    working_hours: 'Thứ 2 - Thứ 7: 09:00 - 20:00 | Chủ Nhật: 09:00 - 18:00',
    logo: '/logo-europia.png'
};
