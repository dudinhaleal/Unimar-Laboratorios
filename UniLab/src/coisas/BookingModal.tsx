import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/coisas/ui/dialog'
import { Button } from '@/coisas/ui/button'
import { Input } from '@/coisas/ui/input'
import { Label } from '@/coisas/ui/label'
import { Textarea } from '@/coisas/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/coisas/ui/select'
import { useBooking } from '@/hooks/useBooking'
import { useLaboratories } from '@/hooks/useLaboratories'
import { useNotifications } from '@/hooks/useNotifications'

export default function BookingModal() {
  const { 
    bookingData, 
    showBookingForm, 
    bookingConfirmed, 
    updateBookingData, 
    submitBooking, 
    closeBookingForm 
  } = useBooking()
  
  const { courses, allLaboratories } = useLaboratories()
  const { showSuccess } = useNotifications()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitBooking()
    showSuccess('Agendamento Confirmado!', 'Sua solicitação foi enviada com sucesso.')
  }

  return (
    <Dialog open={showBookingForm} onOpenChange={closeBookingForm}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agendar Visita ao Laboratório</DialogTitle>
          <DialogDescription>
            Preencha os dados para poder usar o laboratório no dia agendado
          </DialogDescription>
        </DialogHeader>

        {bookingConfirmed ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Agendamento Confirmado!</h3>
            <p className="text-muted-foreground text-pretty">
              Sua solicitação foi enviada. Você receberá uma confirmação em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={bookingData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBookingData('name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="course">Curso</Label>
              <Select
                value={bookingData.course}
                onValueChange={(value: string) => updateBookingData('course', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course === 'all' ? 'Selecione seu curso' : course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="laboratory">Laboratório</Label>
              <Select
                value={bookingData.laboratory}
                onValueChange={(value: string) => updateBookingData('laboratory', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o laboratório" />
                </SelectTrigger>
                <SelectContent>
                  {allLaboratories.map((lab) => (
                    <SelectItem key={lab.id} value={lab.name}>
                      {lab.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={bookingData.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBookingData('date', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={bookingData.time}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBookingData('time', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purpose">Finalidade da Visita</Label>
              <Textarea
                id="purpose"
                placeholder="Descreva o motivo da sua visita..."
                value={bookingData.purpose}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateBookingData('purpose', e.target.value)}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full">
              Confirmar Agendamento
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
