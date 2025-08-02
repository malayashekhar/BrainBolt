import { quizs } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm';
import Link from 'next/link'

export type Quizs = InferSelectModel<typeof quizs>

type Props = {
    quizs: Quizs[]
}

const QuizsTable = (props: Props) => {
    return(
        <div className='rounded-md overflow-hidden p-5 border'>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th className='text-[#6c7381] text-left'>Name</th>
                        <th className='text-[#6c7381] text-left'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.quizs.map((quizs: Quizs) => (
                            <tr key={quizs.id}>
                                <td><Link href={`/quiz/${quizs.id}`}><p className='text-blue-600 underline'>{quizs.name}</p></Link></td>
                                <td>{quizs.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default QuizsTable;