import Link from "next/link";
import {PiFacebookLogo, PiInstagramLogo, PiPhone, PiTiktokLogo, PiYoutubeLogo} from "react-icons/pi";
import {IoMailOutline} from "react-icons/io5";

export default function Footer(){
	return (
		<footer className={`bg-[#f9f9f9] pt-14 pb-32 bg-[url('/images/footer.png')] bg-left-bottom bg-repeat-x`}>
			<div className="relative z-10 container grid lg:grid-cols-4 gap-8">
				<div className={'flex flex-col gap-6 lg:col-span-2'}>
					<h4 className={'font-bold text-2xl'}>Thông tin cửa hàng</h4>
					<div className={'flex flex-col gap-4'}>
						<Link href={'#youtube'} className={'flex items-center text-gray-700 gap-3'}>
							<PiYoutubeLogo className={'w-6 h-6'}/>
							<span>@tenkenhyt</span>
						</Link>
						<Link href={'#so-phone'} className={'flex items-center text-gray-700 gap-3'}>
							<PiPhone className={'w-6 h-6'}/>
							<span>0912.123.456</span>
						</Link>
						<Link href={'#youtube'} className={'flex items-center text-gray-700 gap-3'}>
							<IoMailOutline className={'w-6 h-6'}/>
							<span>email@gmail.com</span>
						</Link>
					</div>
				</div>
				<div className={'flex flex-col gap-6'}>
					<h4 className={'font-bold text-2xl'}>Mạng xã hội</h4>
					<div className={'flex gap-3'}>
						<Link href={'#youtube'}>
							<PiYoutubeLogo className={'h-10 w-10'}/>
						</Link>
						<Link href={'#youtube'}>
							<PiInstagramLogo className={'h-10 w-10'}/>
						</Link>
						<Link href={'#youtube'}>
							<PiTiktokLogo className={'h-10 w-10'}/>
						</Link>
						<Link href={'#youtube'}>
							<PiFacebookLogo className={'h-10 w-10'}/>
						</Link>
					</div>
				</div>
				<div className={'flex flex-col gap-6 lg:text-right'}>
					<h4 className={'font-bold text-2xl'}>Chính sách</h4>
					<Link href={'/chinh-sach'} className={'text-gray-700'}>Chính sách bảo hành</Link>
				</div>
			</div>
		</footer>
	)
}
