import Layout from '@/components/layouts/layout'
import { DataCreate } from '@/components/pages/DataCreate'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/data-create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
        <DataCreate/>
    </Layout>
  )
}
